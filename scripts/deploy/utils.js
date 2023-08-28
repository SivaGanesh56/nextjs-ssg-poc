const withoutLeadingSlash = (s) => (s.startsWith("/") ? s.substring(1) : s);
const withoutTrailingSlash = (s) =>
  s.endsWith("/") ? s.substring(0, s.length - 1) : s;
const withTrailingSlash = (s) => (s.endsWith("/") ? s : `${s}/`);

module.exports = {
  withoutLeadingSlash,
  withoutTrailingSlash,
  withTrailingSlash,
};
