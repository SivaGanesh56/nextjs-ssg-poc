import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { i18next } from "../index";

const Page = async ({ params }) => {
  if (params.locale === "ko") notFound();
  const res = i18next.t("key");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Home Page</h3>
        <div>{res}</div>
      </main>
      <Footer />
    </div>
  );
};

export async function generateStaticParams() {
  const locales = [
    "en-US",
    "fr",
    "ja-JP",
    "es-001",
    "de-DE",
    "pt-BR",
    "en-GB",
    "ko",
    "en-SG",
    "en-AU",
    "it",
    "ar",
  ];
  return locales.map((locale) => ({ locale }));
}

export default Page;
