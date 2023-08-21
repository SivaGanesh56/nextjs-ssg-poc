export const translationVariableLookup = {
  "English (en-US)": "en-US",
  "French (fr-FR)": "fr-FR",
  "Japanese (ja-JP)": "ja-JP",
  "Spanish (es-001)": "es-001",
  "German (de-DE)": "de-DE",
  "Portuguese (pt-BR)": "pt-BR",
  "English (en-GB)": "en-GB",
  "Korean (ko)": "ko",
  "English (en-SG)": "en-SG",
  "English (en-AU)": "en-AU",
  "Italian (it)": "it",
  "Arabic (ar)": "ar",
};

const supportedLocales = [
  "en-US",
  "fr-FR",
  "ja-JP",
  "es-001",
  "de-DE",
  "pt-BR",
  "en-GB",
  "ko",
  "en-SG",
  "en-AU",
  "it",
  "ar",
];

// Construct a regular expression to match any of the supported locales
const localesPattern = supportedLocales.join("|");
const localeRegex = new RegExp(`^(${localesPattern})\\/`, "i");

export const removeLocale = (url = "") => url.replace(localeRegex, "");

export function flattenAndOmitMetadataAndSys(obj) {
  if (typeof obj !== "object" || !obj) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(flattenAndOmitMetadataAndSys);
  }

  const result = {};
  for (const key in obj) {
    if (key === "sys" || key === "metadata") continue;
    if (key === "fields") {
      return flattenAndOmitMetadataAndSys(obj[key]);
    } else {
      result[key] = flattenAndOmitMetadataAndSys(obj[key]);
    }
  }

  return result;
}

export const extractLocale = (paths = []) =>
  supportedLocales.find((locale) => locale === paths[0]) ?? "en-US";
