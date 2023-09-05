import "server-only";
import _merge from 'lodash.merge';
import _memoize from 'lodash.memoize';

const messages = {
  fr: () =>
    import("../../dictionaries/fr.json").then((module) => module.default),
  "en-US": () =>
    import("../../dictionaries/en-US.json").then((module) => module.default),
    "it": () =>
    import("../../dictionaries/it.json").then((module) => module.default),
    "ja-JP": () =>
    import("../../dictionaries/ja.json").then((module) => module.default),
};

const getDefaultMessage = () => messages['en-US'];

const getMessages = async (locale) => {
  const messageLoader = messages[locale] || getDefaultMessage();
  const bundle = await messageLoader();
  return bundle;
};

export default _memoize(getMessages);