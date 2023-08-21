/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://sprinklr.com",
  generateRobotsTxt: true,
  transform: (config, url) => {
    if (url.startsWith("/compare")) return config;
    return {
      loc: url,
      lastmod: config.lastmod,
      alternateRefs: config.alternateRefs,
      priority: config.priority,
      changefreq: config.changefreq,
      trailingSlash: config.trailingSlash,
    };
  },
  output: "static",
};
