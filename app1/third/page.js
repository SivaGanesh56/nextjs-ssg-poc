import React from "react";
import { gqlClient } from "../../lib/api";
import { FETCH_PAGES, FETCH_PAGE_CONTENT } from "../../lib/queries";
import { translationVariableLookup } from "../../utils";
import { templatesMap } from "../../templates";

const Page = async (props) => {
  const result = await getData(props);
  const templates =
    result?.content?.pageContent?.templatesCollection?.items ?? [];
  return (
    <div>
      <h1>Page - {props?.params.slug}</h1>
      <div>
        {templates.map((item, idx) => {
          const Template = templatesMap[item.__typename];
          if (Template) return <Template key={idx} {...item} />;
        })}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const result = await gqlClient.query({
    query: FETCH_PAGES,
  });

  const data = result.data.pageCollection.items;

  const paths = data.reduce((acc, curr) => {
    const {
      navSlug,
      translations: { languagesToRenderIn },
    } = curr;

    const languages = languagesToRenderIn ?? ["en-US"];

    const localePaths = languages.reduce((acc, lang) => {
      const locale = translationVariableLookup[lang];
      if (!locale) return acc;
      const slug = locale === "en-US" ? navSlug : `${locale}/${navSlug}`;
      return [
        ...acc,
        { params: { slug: slug.split("/"), searchParams: { locale } } },
      ];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return { paths, fallback: false };
}

export async function getData({ params, ...rest }) {
  const slug = params.slug.join("/");

  const pagesResult = await gqlClient.query({
    query: FETCH_PAGES,
  });

  const page = pagesResult.data.pageCollection.items.find(
    (p) => p.navSlug === slug
  );

  const contentResult = {};
  // await gqlClient.query({
  //   query: FETCH_PAGE_CONTENT,
  //   variables: {
  //     id: page?.sys?.id,
  //     locale: "en-US",
  //   },
  // });

  return {
    content: contentResult?.data?.page || {},
  };
}

export default Page;
