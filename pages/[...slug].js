import { useTranslation } from "next-i18next";

import SEO from "../components/SEO";

import { getPage, getPages } from "../lib/contentful";
import { makeStaticProps } from "../lib/getStatic";

import {
  extractLocale,
  removeLocale,
  translationVariableLookup,
} from "../utils";

export default function Page({ content, locale }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <SEO />
      <h4>{t("Page Template")}</h4>
      <h5>Locale - {locale}</h5>
      <h5>Page - {content?.name}</h5>
    </div>
  );
}

export async function getStaticPaths() {
  const pages = await getPages();

  const paths = pages.reduce((acc, curr) => {
    const {
      navSlug,
      translations: { languagesToRenderIn },
    } = curr;

    const languages = languagesToRenderIn ?? ["en-US"];

    const localePaths = languages.reduce((acc, lang) => {
      const locale = translationVariableLookup[lang];
      if (!locale || navSlug === "/") return acc;
      const slug = locale === "en-US" ? navSlug : `/${locale}/${navSlug}`;
      return [...acc, { params: { slug: slug.split("/").filter(Boolean) } }];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = makeStaticProps(async function ({ params }) {
  const locale = extractLocale(params.slug);
  const slug = removeLocale(params.slug.join("/"));

  const pages = await getPages();

  const page = pages.find((p) => p.navSlug === slug);

  if (!page)
    return {
      notFound: true,
    };

  const pageData = await getPage(page.sys.id, locale);

  return {
    content: pageData,
  };
});