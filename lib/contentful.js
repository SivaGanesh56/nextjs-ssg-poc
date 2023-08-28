const { flattenAndOmitMetadataAndSys } = require("../utils");
const safeStringify = require("fast-safe-stringify");

const contentful = require("contentful");

const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env || {};

const client = contentful.createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
  environment: "master",
  host: "preview.contentful.com",
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

export async function getEntry(id, locale) {
  try {
    if (!id) return {};
    const entry = await client.getEntry(id, {
      locale,
      include: 4,
    });

    // TODO: this is to remove circular references
    // try better approach
    const safeEntry = JSON.parse(safeStringify(entry));
    const result = flattenAndOmitMetadataAndSys(safeEntry);

    return result;
  } catch (error) {
    console.error("error while fetching page..", error);
    return {};
  }
}

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

    return entries
      .filter((entry) => Boolean(entry?.fields?.navSlug))
      .map((entry) => {
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

export async function getProductPages() {
  try {
    const entries = await recurse(async (skip) => {
      return await client.getEntries({
        content_type: "featurePage",
        select: ["fields.slug", "fields.product", "fields.translations"].join(
          ","
        ),
        skip,
        limit: 100,
      });
    });

    return entries
      .filter((entry) => Boolean(entry?.fields?.slug))
      .map((entry) => {
        return {
          slug: entry.fields.slug,
          categorySlug: entry.fields?.product?.fields?.slug,
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
