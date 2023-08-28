const fs = require("fs");
const path = require("path");

function moveFolder(outputDir, folder) {
  const sourceDir = path.join(outputDir, folder);
  const destinationDir = outputDir;

  if (!fs.existsSync(sourceDir)) {
    console.log(
      `Source directory '${sourceDir}' does not exist. Nothing to move.`
    );
    return;
  }

  try {
    const items = fs.readdirSync(sourceDir);
    for (const item of items) {
      const sourceItemPath = path.join(sourceDir, item);
      const destinationItemPath = path.join(destinationDir, item);
      fs.renameSync(sourceItemPath, destinationItemPath);
    }
    fs.rmdirSync(sourceDir);
    console.log("en-US contents moved successfully.");
  } catch (err) {
    console.error("Error moving en-US contents:", err);
  }
}

module.exports = { moveFolder };
