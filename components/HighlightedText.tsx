import React, { useMemo, ReactElement } from "react";
import { formatText } from "../utils/helpers";

type Props = {
  children: string;
  boxClass?: string;
  textClass?: string;
  as?: React.ElementType;
  startEnhancer?: ReactElement;
};

export const HighlightedText = ({
  children,
  boxClass = "",
  textClass = "",
  as = "div",
  startEnhancer,
}: Props): ReactElement => {
  const formattedText = useMemo(() => formatText(children), [children]);

  return (
    <div className={`whitespace-pre-wrap ${boxClass}`}>
      {startEnhancer}
      {formattedText.map(({ content, token }, idx) => (
        <span key={idx} className={`${textClass} text-${token}`}>
          {content}
        </span>
      ))}
    </div>
  );
};