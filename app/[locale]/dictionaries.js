import "server-only";

const dictionaries = {
  fr: () =>
    import("../../dictionaries/fr.json").then((module) => module.default),
  "en-US": () =>
    import("../../dictionaries/en-US.json").then((module) => module.default),
};

export const getDictionary = async (locale) =>
  dictionaries[locale] ? dictionaries[locale]() : dictionaries["en-US"]();
