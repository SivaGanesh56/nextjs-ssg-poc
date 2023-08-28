const fg = require("fast-glob");

async function getStaticExportPages(exportFolder) {
  // Get html file paths using glob
  const htmlFiles = await fg(`${exportFolder}/**/*.html`);

  // Cleanup files
  return htmlFiles?.map((file) =>
    file
      .replace(exportFolder, "")
      .replace("index", "")
      .replace(".html", "")
      .trim()
  );
}

module.exports = { getStaticExportPages };
