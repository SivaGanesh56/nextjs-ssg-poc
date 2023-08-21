import { makeStaticProps } from "../../lib/getStatic";

export default function Page() {
  return <div>Home Page</div>;
}

export const getStaticProps = makeStaticProps(async function callback() {
  return {};
});

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
