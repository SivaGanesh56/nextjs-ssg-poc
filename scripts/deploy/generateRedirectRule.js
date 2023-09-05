const { withoutLeadingSlash } = require("./utils");

const buildCondition = (redirectPath) => {
  return {
    KeyPrefixEquals: withoutLeadingSlash(redirectPath),
  };
};

const buildRedirect = (route) => {
  if (route.toPath.indexOf("://") > 0) {
    const url = new URL(route.toPath);
    return {
      ReplaceKeyWith: withoutLeadingSlash(url.href.replace(url.origin, "")),
      HttpRedirectCode: route.isPermanent ? "301" : "302",
      Protocol: url.protocol.slice(0, -1),
      HostName: url.hostname,
    };
  }
  return {
    ReplaceKeyWith: withoutLeadingSlash(route.toPath),
    HttpRedirectCode: route.isPermanent ? "301" : "302",
    Protocol: "https",
    HostName: "www.sprinklr.com", // drive through env
  };
};

const getRules = (routes) =>
  routes.map((route) => ({
    Condition: {
      ...buildCondition(route.fromPath),
    },
    Redirect: {
      ...buildRedirect(route),
    },
  }));


