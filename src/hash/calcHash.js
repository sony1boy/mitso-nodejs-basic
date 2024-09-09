import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';


async function calcHash() {
   
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sourceFolder = path.join(__dirname, 'files');
    const oldFilename = 'fileToCalculateHashFor.txt';
    const sourceFilePath = path.join(sourceFolder, oldFilename);

    try {
        await fs.promises.access(sourceFilePath);

        const fileStream = fs.createReadStream(sourceFilePath);

        const hash = crypto.createHash('sha256');

        fileStream.on('data', (chunk) => {
            hash.update(chunk);
        });

        fileStream.on('end', () => {
            const digest = hash.digest('hex'); 
            console.log('SHA256 Hash:', digest);
        });

        fileStream.on('error', (error) => {
            console.error('Error reading file:', error);
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('File not found:', sourceFilePath);
        } else {
            console.error('Error accessing file:', error);
        }
    }
}

calcHash();
