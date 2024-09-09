import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readAndPrintFile = async () => {
   
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const fileStream = fs.createReadStream(filePath);

    return new Promise((resolve, reject) => {
        fileStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        fileStream.on('end', () => {
            resolve();
        });

        fileStream.on('error', (error) => {
            reject(error);
        });
    });
};

(async () => {
    try {
        await readAndPrintFile();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
