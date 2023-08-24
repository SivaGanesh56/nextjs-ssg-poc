import React from "react";
import Image from "next/image";
import { makeStaticProps } from "../lib/getStatic";
import { useTranslation } from "next-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

const index = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-20">
        <h3>Home Page</h3>
        <h5>{t("Hello")}</h5>
        <Image
          src="https://images.ctfassets.net/ukazlt65o6hl/6cWIgfzuITiAzJDKPVzDe7/4e9d3d639759c66be5deb4b0d70e88ba/Group_1000003569.jpg"
          alt="image"
          width={500}
          height={500}
          loader={({ src, width, quality }) => {
            return src + "?w=" + width;
          }}
          placeholder="blur"
          blurDataURL="https://images.ctfassets.net/ukazlt65o6hl/4W7L7kJFo1uZV9LytxpGpS/54f82f4f2d23544834da69e56a6c7279/social_adv_lp_banner.png"
        />
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = makeStaticProps(async function callback() {
  return {};
});

export default index;
