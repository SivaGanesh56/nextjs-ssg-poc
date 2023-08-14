import { ApolloClient, InMemoryCache } from "@apollo/client";

async function fetchGraphQL(query, preview = true) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getPages() {
  const entries = await fetchGraphQL(
    `query {
      pageCollection {
        items {
          navSlug
          name
        }
      }
    }`
  );

  return entries?.data?.pageCollection.items;
}

export const gqlClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/ukazlt65o6hl/environments/master?access_token=lXW2qEPVidpMUQYnMBWuE9gf3UT0P9_BvP65wvdzmuo`,
  cache: new InMemoryCache(),
});
