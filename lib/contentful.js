import { flattenAndOmitMetadataAndSys } from "../utils";

const contentful = require("contentful");
const fs = require("fs");

const client = contentful.createClient({
  accessToken: "3gwqhJhNhYmQTqKiskqRD1DeXGM7IqGT2UownM-bhY0",
  space: "ukazlt65o6hl",
  environment: "master",
});

export const recurse = async (callback, skip = 0, limit = 100) => {
  const response = await callback(skip);

  if (response.errors) {
    throw new Error(
      JSON.stringify({
        skip,
        limit,
        errors: response.errors,
      })
    );
  }

  // Contentful provides a `stringifySafe` method that removes all the circular references:
  const safeResponse = JSON.parse(response.stringifySafe());

  if (safeResponse.total > limit + skip) {
    const next = await recurse(callback, skip + limit, limit);
    return [...safeResponse.items, ...next];
  }

  return safeResponse.items;
};

export async function getPages() {
  try {
    const entries = await recurse(async (skip) => {
      return await client.getEntries({
        content_type: "page",
        select: ["fields.navSlug", "fields.name", "fields.translations"].join(
          ","
        ),
        skip,
        limit: 100,
      });
    });

    return entries.map((entry) => {
      return {
        navSlug: entry.fields.navSlug,
        translations: {
          languagesToRenderIn:
            entry.fields.translations?.fields?.languagesToRenderIn,
        },
        sys: entry.sys,
      };
    });
  } catch (error) {
    console.error("Error occurred while retrieving pages", error);
    return [];
  }
}

export async function getPage(id, locale) {
  try {
    if (!id) return {};
    const entry = await client.getEntry(id, {
      locale,
      // include: 10,
    });

    return flattenAndOmitMetadataAndSys(entry || {});
  } catch (error) {
    console.error("error while fetching page", error);
    return {};
  }
}
