const fg = require("fast-glob");

async function getStaticExportPages() {
  const exportFolder = "out";

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

getStaticExportPages()
  .then((staticPages) => {
    console.log("Static Export Pages:", staticPages);
  })
  .catch((error) => {
    console.error(error);
  });
