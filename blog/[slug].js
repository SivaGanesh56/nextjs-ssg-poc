import { gqlClient } from "../lib/api";
import {
  FETCH_BLOG_POST_PAGES,
  FETCH_BLOG_POST_PAGE_CONTENT,
} from "../lib/queries";

export default function Page({ content }) {
  const {
    data: {
      blogPostPage: { blogPostTitle },
    },
  } = content;
  return (
    <div style={{ margin: "5rem 0" }}>Blog Post Page: {blogPostTitle}</div>
  );
}

export async function getStaticPaths() {
  const result = await gqlClient.query({
    query: FETCH_BLOG_POST_PAGES,
  });

  const data = result.data.blogPostPageCollection.items;

  const paths = data.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const pagesResult = await gqlClient.query({
    query: FETCH_BLOG_POST_PAGES,
  });

  const page = pagesResult.data.blogPostPageCollection.items.find(
    (p) => p.slug === slug
  );

  const contentResult = await gqlClient.query({
    query: FETCH_BLOG_POST_PAGE_CONTENT,
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
