import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../next-i18next.config";

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: process.env.NEXT_MODE === "PREVIEW" ? true : false,
  paths: getI18nPaths(),
});

export const getI18nProps = async (
  locale = i18nextConfig.i18n.defaultLocale,
  ns = ["common"]
) => {
  const props = {
    ...(await serverSideTranslations(locale, ns)),
  };
  return props;
};

export function makeStaticProps(callback, ns) {
  return async function getStaticProps(ctx) {
    const locale = ctx?.params?.locale || "en-US";
    const data = await callback(ctx);
    const translations = await getI18nProps(locale, ns);

    if (data?.notFound) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...data,
        ...translations,
      },
      revalidate: process.env.NEXT_MODE === "PREVIEW" ? 10 : undefined,
    };
  };
}
