import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import { getEntry, getPages } from "../../../lib/contentful";
import { translationVariableLookup } from "../../../utils";

export default async function Page({ params }) {
  const data = await getData(params);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h5>Locale - {params.locale}</h5>
        <h5>Page - {data?.name}</h5>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await getPages();

  return pages.reduce((acc, curr) => {
    const {
      navSlug,
      translations: { languagesToRenderIn },
    } = curr;

    const languages = languagesToRenderIn ?? ["en-US"];

    const localePaths = languages.reduce((acc, lang) => {
      const locale = translationVariableLookup[lang];
      if (!locale || navSlug === "/") return acc;
      return [...acc, { slug: navSlug.split("/").filter(Boolean), locale }];
    }, []);

    return [...acc, ...localePaths];
  }, []);
}

async function getData({ locale, slug }): Promise<any> {
  const resolvedSlug = slug.join("/");

  const pages = await getPages();

  const page = pages.find((p) => p.navSlug === resolvedSlug);

  if (!page) notFound();

  const pageData = await getEntry(page.sys.id, locale);

  return pageData;
}
