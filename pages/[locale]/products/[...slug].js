import { useTranslation } from "next-i18next";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getEntry, getProductPages } from "../../../lib/contentful";

import { makeStaticProps } from "../../../lib/getStatic";

import { translationVariableLookup } from "../../../utils";
import FeatureInfo from "../../../components/FeatureInfo";
import TemplateRenderer from "../../../templates/TemplateRenderer";

export default function Page({ content, locale }) {
  const { t } = useTranslation("common");
  const { name, product, title, description, media, ctas, ...rest } =
    content || {};

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <FeatureInfo
          name={name}
          product={product}
          title={title}
          description={description}
          media={media}
          ctas={ctas}
        />
        <TemplateRenderer templates={rest?.templates || []} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const pages = await getProductPages();

  const paths = pages.reduce((acc, curr) => {
    const {
      slug,
      categorySlug,
      translations: { languagesToRenderIn },
    } = curr;

    const languages = languagesToRenderIn ?? ["en-US"];

    const localePaths = languages.reduce((acc, lang) => {
      const locale = translationVariableLookup[lang];
      const path = `${categorySlug}/${slug}/`;

      let resolvedSlug = path.replace(/\/\/+/g, "/");
      resolvedSlug = resolvedSlug.replace(/\/?$/, "/");
      return [
        ...acc,
        { params: { slug: resolvedSlug.split("/").filter(Boolean), locale } },
      ];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return {
    paths: paths,
    fallback: true,
  };
}

export const getStaticProps = makeStaticProps(async function ({ params }) {
  const { locale } = params;
  const slug = params.slug.at(-1);

  const pages = await getProductPages();

  const page = pages.find(
    (p) => p.slug === slug || p.slug === `/${slug}` || p.slug === `${slug}/`
  );

  if (!page) {
    return {
      notFound: true,
    };
  }

  const pageData = await getEntry(page.sys.id, locale);

  return {
    content: pageData,
    locale,
  };
});
