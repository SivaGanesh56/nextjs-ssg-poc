/** @type {import('next').NextConfig} */
module.exports = {
  output: process.env.NEXT_MODE === 'static' ? 'export' : 'standalone',
  trailingSlash: true,
  images: {
    loader: "custom",
  },
};
