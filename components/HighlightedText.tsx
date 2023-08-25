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
  startEnhancer,
}: Props): ReactElement => {
  const formattedText = useMemo(() => formatText(children), [children]);

  return (
    <div className={`whitespace-pre-wrap ${boxClass}`}>
      {startEnhancer}
      <span className="text-primary"> Reduce costs by 50% </span>
      {formattedText.map(({ content, token }, idx) => (
        <span key={`${token}-${idx}`} className={token}>
          {content}
        </span>
      ))}
    </div>
  );
};
