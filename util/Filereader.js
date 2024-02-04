import fs from "fs";
import path from "path";

export const Filereader = (dir) => {
  if (!fs.existsSync(dir)) return [console.log(`readed ${dir}`)];
  const files = [];
  const directoryData = fs.readdirSync(dir);

  for (const file of directoryData) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && path.extname(filePath) === ".js")
      files.push(filePath);
    else if (stats.isDirectory()) files.push(...Filereader(filePath));
  }

  return files;
};
