require("dotenv").config();

/** @type {import('next').NextConfig} */
module.exports = {
  output: process.env.NEXT_MODE === "PREVIEW" ? "standalone" : "export",
  images: {
    loader: "custom",
  },
};
