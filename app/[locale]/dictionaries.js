import "server-only";
import _merge from 'lodash.merge';
import _memoize from 'lodash.memoize';

const dictionaries = {
  fr: () =>
    import("../../dictionaries/fr.json").then((module) => module.default),
  "en-US": () =>
    import("../../dictionaries/en-US.json").then((module) => module.default),
    "it": () =>
    import("../../dictionaries/it.json").then((module) => module.default),
    "ja-JP": () =>
    import("../../dictionaries/ja.json").then((module) => module.default),
};

const getDictionary = async (locale) => {
  // const defaultBundle = await dictionaries["en"]();
  // if (dictionaries[locale] && locale !== "en") {
  //   const localeBundle = await dictionaries[locale]();
  //   return _merge(defaultBundle, localeBundle);
  // }

  const localeBundle = await dictionaries[locale]();

  return localeBundle;
};

export default _memoize(getDictionary);