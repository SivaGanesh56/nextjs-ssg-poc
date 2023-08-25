import _replace from 'lodash/replace';

export const formatText = (unFormattedText: string) => {
  const text = _replace(unFormattedText, '\\n', '\n');
  //@ts-ignore
  let matches = [...text.matchAll(/<(.*?)>(.*?)<\/(.*?)>/g)];
  let result = [],
    startIndex = 0;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (match.index > startIndex) {
      result.push({
        content: text.substring(startIndex, match.index),
      });
      startIndex = match.index;
    }
    result.push({
      content: match[2],
      token:  match[1] ? `text-${match[1]}` : undefined,
    });
    startIndex = startIndex + match[0].length;
  }
  if (startIndex < text.length) {
    result.push({
      content: text.substring(startIndex),
    });
  }

  return result;
};

export const makeFeaturePageSlug = ({
    productSlug,
    featureSlug = '',
  }: {
    productSlug: string;
    featureSlug?: string;
  }) => `/products/${productSlug}/${featureSlug}`.replace(/\/\/+/g, '/');
  