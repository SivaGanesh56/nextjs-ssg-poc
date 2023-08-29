"use client";

import React, { JSX } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { extractAttributesFromElement } from "../utils/iframe.utils";

const RichText = ({ richText }) => {
  return documentToReactComponents(richText, {
    renderNode: {
      "heading-2": (_node, children) => (
        <h2 className="text-red-900 my-2">{children}</h2>
      ),
      "embedded-entry-block": (node, children) => {
        const { target } = node.data;

        if (target?.__typename === "iFrame") {
          const attributes = extractAttributesFromElement(
            target?.iFrameText,
            target?.name
          );
          return <iframe className="w-full h-96 my-10" {...attributes} />;
        }
        return children;
      },
    },
  }) as JSX.Element;
};

export default RichText;
