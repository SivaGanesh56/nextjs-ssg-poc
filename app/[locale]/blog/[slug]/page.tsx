import { notFound } from "next/navigation";
import React from "react";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import RichText from "../../../../components/RichText";
import ServerComponent from "../../../../components/ServerComponent";

import { getBlogPages } from "../../../../lib/api";
import { getEntry } from "../../../../lib/contentful";
import { translationVariableLookup } from "../../../../utils";

const BlogPostPage = async ({ params }) => {
  const { blogPostTitle, blogPostBody } = (await getData(params)) || {};
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Blog Post Page</h3>
        <h5>Title - {blogPostTitle}</h5>
        <div className="my-2">
          <RichText richText={blogPostBody} />
        </div>
        <ServerComponent />
      </main>
      <Footer />
    </div>
  );
};

export async function generateStaticParams() {
  const pages = await getBlogPages();

  const params = pages.reduce((acc, curr) => {
    const {
      slug,
      translations: { languagesToRenderIn },
    } = curr;

    const languages = languagesToRenderIn ?? ["en-US"];

    const localePaths = languages.reduce((acc, lang) => {
      const locale = translationVariableLookup[lang];
      return [...acc, { slug, locale }];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return params.slice(0, 5);
}

async function getData({ slug, locale }): Promise<any> {
  const blogPages = await getBlogPages();
  const blogPage = blogPages.find((o) => o.slug === slug);

  if (!blogPage) notFound();

  const blogPageData = await getEntry(blogPage.sys.id, locale);

  return blogPageData;
}

export default BlogPostPage;
