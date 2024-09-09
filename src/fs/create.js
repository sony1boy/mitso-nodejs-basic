import fs from "fs/promises"
import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const filePath = path.join(__dirname, "files", "files.txt");
const CONTENT = "Hello ";
const create = async () => {

    try{ 
        const files = await fs.readdir(path.join(__dirname, "files"));
        if(files.includes("fresh.txt")) throw new Error ("FS operation failed ");

        await fs.writeFile(filePath, CONTENT, {
            flag:"wx", 
        });

        console.log("Данные записаны!");

    } catch (err) {
        console.log(err.message);
    }

};



await create();