/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    loader: "custom",
  },
  i18n: {
    locales: [
      "en-US",
      "fr-FR",
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
    ],
    defaultLocale: "en-US",
  },
  async redirects() {
    return [
      {
        source: "/blog/integrate-for-unified-cx",
        destination: "/blog/",
        permanent: false,
      },
    ];
  },
};
