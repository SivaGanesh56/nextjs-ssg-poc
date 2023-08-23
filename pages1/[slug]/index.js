import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SEO from "../../components/SEO";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SEO />
      <main className="flex-grow m-20">
        <h5>Welcome to Sprinklr</h5>
      </main>
      <Footer />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}

export function getStaticPaths() {
  const paths = [
    { params: { slug: "fr-FR" } },
    { params: { slug: "ja-JP" } },
    { params: { slug: "es-001" } },
    { params: { slug: "de-DE" } },
    { params: { slug: "pt-BR" } },
    { params: { slug: "en-GB" } },
    { params: { slug: "ko" } },
    { params: { slug: "en-SG" } },
    { params: { slug: "en-AU" } },
    { params: { slug: "it" } },
    { params: { slug: "ar" } },
  ];

  return {
    paths,
    fallback: false,
  };
}
