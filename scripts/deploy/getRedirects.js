const contentful = require("contentful");

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env || {};

const client = contentful.createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
  environment: "master",
  host: "preview.contentful.com",
});

async function getRedirects() {
  try {
    const entries = await client.getEntries({
      content_type: "redirect",
      select: [
        "fields.fromPath",
        "fields.toPath",
        "fields.isPermanent",
        "fields.locale",
      ].join(","),
    });

    return entries.items.map((o) => o.fields);
  } catch (error) {
    console.error("Error occurred while retrieving redirects", error);
    return [];
  }
}

module.exports = { getRedirects };
