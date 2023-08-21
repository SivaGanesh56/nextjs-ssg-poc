import { gqlClient } from "../../../lib/api";
import {
  FETCH_BLOG_AUTHOR_PAGES,
  FETCH_BLOG_AUTHOR_PAGE_CONTENT,
} from "../../../lib/queries";

export default function Page({ content }) {
  const {
    data: {
      blogAuthorPage: { authorName },
    },
  } = content;
  return <div style={{ margin: "5rem 0" }}>Blog Author Page: {authorName}</div>;
}

export async function getStaticPaths() {
  const result = await gqlClient.query({
    query: FETCH_BLOG_AUTHOR_PAGES,
  });

  const data = result.data.blogAuthorPageCollection.items;

  const paths = data.map((page) => ({
    params: { slug: page.person.slug || "sprinklr-team" },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const pagesResult = await gqlClient.query({
    query: FETCH_BLOG_AUTHOR_PAGES,
  });

  const page = pagesResult.data.blogAuthorPageCollection.items.find(
    (p) => p.person.slug === slug
  );

  const contentResult = await gqlClient.query({
    query: FETCH_BLOG_AUTHOR_PAGE_CONTENT,
    variables: {
      id: page.sys.id,
    },
  });

  return {
    props: {
      content: contentResult,
    },
  };
}
