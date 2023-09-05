// TODO: remove dotenv import, not required in production
require("dotenv").config();
const { moveFolder } = require("./moveFolder");
const { getStaticExportPages } = require("./extractPages");
const klaw = require("klaw");
const { relative, join } = require("path");
const fs = require("fs");
const streamToPromise = require("stream-to-promise");
const S3 = require('aws-sdk/clients/s3');
const mime = require("mime");
const { asyncify, parallelLimit } = require("async"); // download asyncify only
const util = require("util");
const { withoutLeadingSlash } = require("./utils");
const { getRedirects } = require("./getRedirects");
const { getRules } = require("./generateRedirectRule");
const { createHash } = require("crypto");

const REDIRECTS = [
  {
    fromPath: "products/customer-service/customer-surveys",
    toPath:
      "https://www.sprinklr.com/products/customer-service/omnichannel-survey/",
    isPermanent: true,
    locale: ["en-us"],
  },
  {
    fromPath: "events/intro-modern-engagement",
    toPath: "https://www.sprinklr.com/customer-service-forrester-tei-report/",
    isPermanent: false,
    locale: ["en-us"],
  },
  {
    fromPath: "blog/total-economic-impact-modern-care",
    toPath: "https://www.sprinklr.com/events/intro-social-media-management/",
    isPermanent: false,
    locale: ["en-us"],
  },
];

const OBJECTS_TO_REMOVE_PER_REQUEST = 1000;

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env || {};

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
// });


const BUCKET_NAME = "nextjs-ssg-poc";

const publicDir = "out";

const promisifiedParallelLimit = util.promisify(parallelLimit);

async function deploy() {
  try {
    // 1. Move folder of en-US to root level (use env to accept default locale)
    // 2. extract pages if required
    // 3. handle redirects
    // 4. upload to s3
    moveFolder("out", "en-US");
    // console.log("moved folder :)");
    // const pages = await getStaticExportPages("out");

    const temporaryRedirects = REDIRECTS.filter(
      (redirect) => !redirect.isPermanent
    );

    const permanentRedirects = REDIRECTS.filter(
      (redirect) => redirect.isPermanent
    );

    const routingRules = getRules(temporaryRedirects);

    const websiteConfig = {
      Bucket: BUCKET_NAME,
      WebsiteConfiguration: {
        IndexDocument: {
          Suffix: "index.html",
        },
        ErrorDocument: {
          Key: "404.html",
        },
      },
    };

    if (routingRules.length) {
      websiteConfig.WebsiteConfiguration.RoutingRules = routingRules;
    }

    const s3 = new S3({ })

    await s3.putBucketWebsite(websiteConfig).promise();

    const stream = klaw(publicDir);

    const uploadQueue = [];

    const isKeyInUse = {};

    const objects = await listAllObjects();

    const keyToETagMap = objects.reduce((acc, curr) => {
      if (curr.Key && curr.ETag) {
        acc[curr.Key] = curr.ETag;
      }
      return acc;
    }, {});

    // pages
    stream.on("data", ({ path, stats }) => {
      if (!stats.isFile()) {
        return;
      }
      uploadQueue.push(
        asyncify(async () => {
          const key = relative(publicDir, path);

          const readStream = fs.createReadStream(path);
          const hashStream = readStream.pipe(
            createHash("md5").setEncoding("hex")
          );
          const data = await streamToPromise(hashStream);

          const tag = `"${data}"`;
          const objectUnchanged = keyToETagMap[key] === tag;

          isKeyInUse[key] = true;

          if (!objectUnchanged) {
            try {

              await s3.putObject({
                Bucket: BUCKET_NAME,
                Key: key,
                Body: fs.createReadStream(path),
                ContentType: mime.getType(path) ?? "application/octet-stream",
              }).promise();

              
              console.log(`uploaded ${path}`);
            } catch (error) {
              console.error("error while uploading file", error);
            }
          }
        })
      );
    });

    // Redirects
    permanentRedirects.map((redirect) => {
      uploadQueue.push(
        asyncify(async () => {
          const { fromPath, toPath: redirectLocation } = redirect;

          let key = withoutLeadingSlash(fromPath);
          if (key.endsWith("/")) {
            key = join(key, "index.html");
          }

          isKeyInUse[key] = true;

          const tag = `"${createHash("md5")
            .update(redirectLocation)
            .digest("hex")}"`;
          const objectUnchanged = keyToETagMap[key] === tag;

          isKeyInUse[key] = true;

          if (objectUnchanged) return;

          try {
            const params = {
              Bucket: BUCKET_NAME,
              Key: key,
              Body: redirectLocation,
              ContentType: "application/octet-stream",
              WebsiteRedirectLocation: redirectLocation,
            };

            await s3.putObject(params).promise();
            console.log("uploading redirection object", key);
          } catch (error) {
            console.error("error", error);
          }
        })
      );
    });

    await streamToPromise(stream);
    await promisifiedParallelLimit(uploadQueue, 10);

    // DELETE non existing objects

    const objectsToRemove = objects
      .map((obj) => ({ Key: obj.Key }))
      .filter((obj) => {
        if (!obj.Key || isKeyInUse[obj.Key]) return false;
        return true;
      });

    for (
      let i = 0;
      i < objectsToRemove.length;
      i += OBJECTS_TO_REMOVE_PER_REQUEST
    ) {
      const objectsToRemoveInThisRequest = objectsToRemove.slice(
        i,
        i + OBJECTS_TO_REMOVE_PER_REQUEST
      );

      await s3
        .deleteObjects({
          Bucket: BUCKET_NAME,
          Delete: {
            Objects: objectsToRemoveInThisRequest,
            Quiet: true,
          },
        })
        .promise();
    }
  } catch (error) {
    console.error("error while deploying", error);
  }
}

const listAllObjects = async () => {
  try {
    const list = [];

    let token;
    do {
      const response = await s3
        .listObjectsV2({
          Bucket: BUCKET_NAME,
          ContinuationToken: token,
        })
        .promise();

      if (response.Contents) {
        list.push(...response.Contents);
      }

      token = response.NextContinuationToken;
    } while (token);

    return list;
  } catch (error) {
    console.error("error while retrieving s3 objects", error);
    return [];
  }
};

deploy();
