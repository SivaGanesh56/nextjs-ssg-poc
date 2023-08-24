import { CSSProperties } from 'react';

import _camelCase from 'lodash/camelCase';

const ATTRIBUTE_REGEX = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

const getStyleObjectFromString = (styleString = ''): CSSProperties => {
  return styleString.split(';').reduce((acc: CSSProperties, curr: string) => {
    const [property, value] = curr.split(':');
    const formattedProperty = _camelCase(property?.trim());
    if (formattedProperty && value) {
      acc[formattedProperty] = value.trim();
    }
    return acc;
  }, {});
};

export function extractAttributesFromElement(
  iframeString: string,
  name?: string,
): Record<string, string | CSSProperties> {
  const attributes: Record<string, string> = {};

  let match;
  while ((match = ATTRIBUTE_REGEX.exec(iframeString))) {
    const attributeName = match[1];
    const attributeValue = match[2] || match[3] || match[4];

    attributes[attributeName] = attributeValue;
  }

  if (
    attributes['src'] &&
    !(attributes['src'] as string).startsWith('https://')
  ) {
    attributes['src'] = `https:${attributes['src']}`;
  }

  return {
    ...attributes,
    title: name || attributes.src,
    style: attributes['style']
      ? getStyleObjectFromString(attributes['style'])
      : null,
  };
}
