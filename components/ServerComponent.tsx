import React from "react";
import { getServerTranslations } from "../app/[locale]/getServerTranslations";

const ServerComponent = async () => {
  const t = await getServerTranslations();
  return (
    <div className="mt-5">
      <h2>ServerComponent</h2>
      <div>{t("test")}</div>
    </div>
  );
};

export default ServerComponent;
