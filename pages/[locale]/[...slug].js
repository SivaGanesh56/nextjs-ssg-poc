import { useTranslation } from "next-i18next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SEO from "../../components/SEO";

import { getEntry, getPages } from "../../lib/contentful";
import { makeStaticProps } from "../../lib/getStatic";

import { translationVariableLookup } from "../../utils";

export default function Page({ content, locale }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SEO />
      <main className="flex-grow m-20">
        <h4>{t("Page Template")}</h4>
        <h5>Locale - {locale}</h5>
        <h5>Page - {content?.name}</h5>
      </main>
      <Footer />
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
      return [
        ...acc,
        { params: { slug: navSlug.split("/").filter(Boolean), locale } },
      ];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return {
    paths: paths.slice(0, 5),
    fallback: false,
  };
}

export const getStaticProps = makeStaticProps(async function ({ params }) {
  const { locale } = params;
  const slug = params.slug.join("/");

  const pages = await getPages();

  const page = pages.find((p) => p.navSlug === slug);

  if (!page)
    return {
      notFound: true,
    };

  const pageData = await getEntry(page.sys.id, locale);

  return {
    content: pageData,
    locale,
  };
});
