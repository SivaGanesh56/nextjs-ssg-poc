import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "graphql-request";
import { FETCH_BLOG_POST_PAGE } from "./queries";

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

export const gqlClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/ukazlt65o6hl/environments/master?access_token=${process.env.CONTENTFUL_GRAPHQL_ACCESS_TOKEN}`,
  cache: new InMemoryCache(),
});

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

export async function getBlogPages() {
  try {
    const entries = await fetchGraphQL(
      `
      query fetchBlogPages {
        blogPostPageCollection(limit: 2000) {
          total
          items {
            slug
            sys {
              id
            }
          }
        }
      }
      `
    );

    return entries?.data?.blogPostPageCollection.items;
  } catch (error) {
    console.error("error while fetching blog pages", error);
    return [];
  }
}

export async function getBlogPostPage(id, locale = "en-US") {
  try {
    const entries = await gqlClient.query({
      query: FETCH_BLOG_POST_PAGE,
      variables: {
        id: id,
        locale,
      },
    });

    return entries?.data?.blogPostPage || {};
  } catch (error) {
    console.error("error while fetching blog pages", error);
    return [];
  }
}
