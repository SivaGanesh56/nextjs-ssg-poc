const fs = require("fs");
const path = require("path");

const outputDir = "out";

function moveEnUsContents() {
  const sourceDir = path.join(outputDir, "en-US");
  const destinationDir = outputDir;

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

moveEnUsContents();
