import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getBlogPages, getBlogPostPage } from "../../../lib/api";
import { makeStaticProps } from "../../../lib/getStatic";

const BlogPostPage = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Blog Post Page</h3>
        <h5>Title - {props?.blogPageData?.blogPostTitle}</h5>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = makeStaticProps(async function callback(context) {
  const { slug, locale } = context?.params;
  const blogPages = await getBlogPages();
  const blogPage = blogPages.find((o) => o.slug === slug);

  if (!blogPage) {
    return {
      notFound: true,
    };
  }

  const blogPageData = await getBlogPostPage(blogPage.sys.id, locale);

  return {
    locale,
    blogPageData,
  };
});

export const getStaticPaths = async () => {
  const locales = ["en-US", "fr-FR", "ja-JP", "es-001", "de-DE", "pt-BR"];

  const slugs = await getBlogPages();

  const paths = locales.flatMap((locale) => {
    return slugs.map((item) => {
      return {
        params: {
          locale,
          slug: item.slug,
        },
      };
    });
  });

  return {
    fallback: false,
    paths,
  };
};

export default BlogPostPage;
