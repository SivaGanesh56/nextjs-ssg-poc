/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://sprinklr.com",
  generateRobotsTxt: true,
  transform: (config, url) => {
    if (url.startsWith("/compare")) return config;

    if (url.startsWith('/en-US')) {
      return {
        loc: url.replace('/en-US', ''),
        lastmod: config.lastmod,
        alternateRefs: config.alternateRefs,
        priority: config.priority,
        changefreq: config.changefreq,
        trailingSlash: config.trailingSlash,
      };
    }
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
  outDir: "out",
};
