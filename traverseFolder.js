const fs = require('fs');
const { join } = require('path');

const traverse = (dir) => {
  let subfolders;

  try {
    subfolders = fs.readdirSync(dir);
    if (subfolders) {
      console.log('👟 Traversing ', dir);

      subfolders.forEach((path) => {
        const fullPath = join(dir, path);
        traverse(fullPath);
      });
    }
  } catch (err) {
    console.error(`Could not open directory ${dir}.`, err);
  }
};

// Traverse current folder
let currentFolder = process.cwd();

traverse(currentFolder);
