import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import RichText from "../../../components/RichText";
import { getBlogPages } from "../../../lib/api";
import { getEntry } from "../../../lib/contentful";
import { makeStaticProps } from "../../../lib/getStatic";
import { translationVariableLookup } from "../../../utils";

const BlogPostPage = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Blog Post Page</h3>
        <h5>Title - {props?.blogPageData?.blogPostTitle}</h5>
        <div className="my-2">
          <RichText richText={props?.blogPageData?.blogPostBody} />
        </div>
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

  const blogPageData = await getEntry(blogPage.sys.id, locale);

  return {
    locale,
    blogPageData,
  };
});

export const getStaticPaths = async () => {
  const pages = await getBlogPages();

  const paths = pages.reduce((acc, curr) => {
    const {
      slug,
      translations: { languagesToRenderIn },
    } = curr;

    const languages = languagesToRenderIn ?? ["en-US"];

    const localePaths = languages.reduce((acc, lang) => {
      const locale = translationVariableLookup[lang];
      return [...acc, { params: { slug, locale } }];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return {
    fallback: false,
    paths: paths,
  };
};

export default BlogPostPage;
