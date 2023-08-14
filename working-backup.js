import { getPages } from "../lib/api";

export default function Page(props) {
  console.log(props);
  return <div>Page Template = {props.currentPage.name}</div>;
}

export async function getStaticPaths() {
  const pages = await getPages();

  const paths = pages.map((page) => ({
    params: { slug: page.navSlug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params, ...rest }) {
  console.log({ params, rest });
  const pages = await getPages();
  const currentPage = pages.find((page) => page.navSlug === params.slug) || {};

  return {
    props: {
      currentPage,
    },
  };
}
