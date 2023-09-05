import { notFound } from "next/navigation";
import FeatureInfo from "../../../components/FeatureInfo";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import ServerComponent from "../../../components/ServerComponent";
import { getEntry, getProductPages } from "../../../lib/contentful";
import TemplateRenderer from "../../../templates/TemplateRenderer";
import { translationVariableLookup } from "../../../utils";

export default async function Page({ params }) {
  const { name, product, title, description, media, ctas, ...rest } =
    (await getData(params)) || {};

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
        <ServerComponent />
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await getProductPages();

  const params = pages.reduce((acc, curr) => {
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
        { slug: resolvedSlug.split("/").filter(Boolean), locale },
      ];
    }, []);

    return [...acc, ...localePaths];
  }, []);

  return params.slice(0, 5);
}

async function getData({ locale, slug }): Promise<any> {
  const pages = await getProductPages();
  const resolvedSlug = slug.at(-1);

  // TODO: this is workaround
  const page = pages.find(
    (p) =>
      p.slug === resolvedSlug ||
      p.slug === `/${resolvedSlug}` ||
      p.slug === `${resolvedSlug}/`
  );

  if (!page) notFound();

  const pageData = await getEntry(page.sys.id, locale);

  return pageData;
}
