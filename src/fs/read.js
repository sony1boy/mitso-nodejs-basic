import fs from "fs/promises"
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const filePath = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, "files"));

    const content = await fs.readFile(filePath, {
        encoding: "utf8", 
    });

    console.log(content);
  
  } catch (err) {
    console.log(err.message);
  }
        
};

await read();