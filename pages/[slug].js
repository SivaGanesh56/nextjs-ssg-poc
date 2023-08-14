import { gqlClient } from "../lib/api";
import { FETCH_PAGES, FETCH_PAGE_CONTENT } from "../lib/queries";
import { translationVariableLookup } from "../utils";
import { useRouter } from "next/router";

import { templatesMap } from "../templates";

export default function Page({ content }) {
  const { locale } = useRouter();
  const items = content?.pageContent?.templatesCollection?.items ?? [];
  return (
    <div>
      <h4>Page Template</h4>
      <h5>Locale - {locale}</h5>
      {items.map((item, idx) => {
        const Template = templatesMap[item.__typename];
        if (Template) return <Template key={idx} {...item} />;
      })}
    </div>
  );
}

export async function getStaticProps({ params, locale, locales }) {
  const slug = params.slug;

  const pagesResult = await gqlClient.query({
    query: FETCH_PAGES,
  });

  const page = pagesResult.data.pageCollection.items.find(
    (p) => p.navSlug === slug
  );

  const contentResult = await gqlClient.query({
    query: FETCH_PAGE_CONTENT,
    variables: {
      id: page.sys.id,
      locale,
    },
  });

  return {
    props: {
      content: contentResult.data.page,
      locale,
      locales,
    },
  };
}

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
      return [...acc, { params: { slug: navSlug }, locale }];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return { paths, fallback: true };
}
