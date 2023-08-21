const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env || {};

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const bucketName = "nextjs-ssg-poc";
const buildOutputPath = "./out";
async function uploadFilesRecursively(directory, baseKey = "") {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await uploadFilesRecursively(filePath, path.join(baseKey, file));
    } else {
      const fileContent = fs.readFileSync(filePath);
      const contentType = getContentType(file);

      const params = {
        Bucket: bucketName,
        Key: path.join(baseKey, file),
        Body: fileContent,
        ContentType: contentType,
      };

      await s3.putObject(params).promise();
      console.log(`Uploaded: ${path.join(baseKey, file)}`);
    }
  }
}

// Function to determine Content-Type based on file extension
function getContentType(fileName) {
  const extension = path.extname(fileName);
  switch (extension) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    // Add more cases for other file types if needed
    default:
      return "application/octet-stream"; // Default to binary data
  }
}

async function main() {
  try {
    await uploadFilesRecursively(buildOutputPath);
    console.log("Upload completed.");
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

main();
