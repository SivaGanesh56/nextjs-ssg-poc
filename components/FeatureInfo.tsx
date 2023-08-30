"use client";

import React from "react";
import Link from "next/link";
// import { CallToAction } from "@sprinklr/shared-lib";
import { HighlightedText } from "./HighlightedText";
import { makeFeaturePageSlug } from "../utils/helpers";
import Icon from "./Icon";
import { useTranslations } from "next-intl";

const FeatureInfo = ({
  title,
  description,
  media,
  ctas,
  name,
  product = {
    productName: "",
    slug: "",
  },
}: {
  title: string;
  description: string;
  media: any;
  ctas?: any[];
  name: string;
  product: {
    productName: string;
    slug: string;
  };
}) => {
  const productSlug = makeFeaturePageSlug({ productSlug: product?.slug });

  const t = useTranslations();

  return (
    <div className="flex flex-col mb-32 md:mb-32 mt-6 md:mt-10 w-full px-16 md:px-32 ">
      <div className="flex flex-col gap-10 mb-30">
        <div className="flex flex-row gap-4 items-center justify-center">
          <Link href={productSlug} className="text-black no-underline">
            <p className="text-xs font-semibold tracking-wide uppercase hover:text-blue-700">
              {product.productName}
            </p>
          </Link>
          <Icon icon={"arrow"} title="Arrow" width={20} height={20} />
          <p className="text-xs font-semibold tracking-wide text-sprText02 text-blue-400">
            {name}
          </p>
        </div>
        <HighlightedText
          boxClass="max-w-screen-xl mx-auto text-center text-4xl md:text-5xl lg:text-7xl font-bold mb-0"
          as="h1"
        >
          {title}
        </HighlightedText>
        <p className="max-w-5xl mx-auto text-center text-sprText02 text-lg md:text-xl lg:text-2xl mb-2">
          {description}
        </p>
      </div>
      {/* {ctas?.length ? (
        <div className="flex flex-row justify-center items-center gap-24 mb-50">
          {ctas.map((cta: any) => (
            <CallToAction key={cta.id} {...cta} />
          ))}
        </div>
      ) : null} */}
      <div className="w-full flex justify-center filter drop-shadow-lg">
        {media && (
          <img
            src={media?.asset?.file?.url}
            alt=""
            className="max-w-screen-xl"
          />
        )}
      </div>
      <div>{t("test")}</div>
    </div>
  );
};

export default FeatureInfo;
