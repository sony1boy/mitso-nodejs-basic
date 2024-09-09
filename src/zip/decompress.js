import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'files', 'archive.gz');
const outputPath = path.join(__dirname, 'files', 'fileToDecompress.txt');

const decompress = async () => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
};

await decompress();
