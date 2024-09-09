import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function moveAndRenameFile() {

  const sourceFolder = path.join(__dirname, 'files_copy');
  const destinationFolder = path.join(__dirname, 'files_rename');
  const oldFilename = 'wrongFilename.txt';
  const newFilename = 'properFilename.md';

  const sourceFilePath = path.join(sourceFolder, oldFilename);
  const destinationFilePath = path.join(destinationFolder, newFilename);

  try {
    await fs.access(sourceFilePath);

    try {
      await fs.access(destinationFilePath);
      console.error('FS operation failed: File already exists');
    } catch (error) {
      if (error.code === 'ENOENT') {
        try {
          await fs.rename(sourceFilePath, destinationFilePath);
          console.log('File moved and renamed successfully');
        } catch (err) {
          console.error('FS operation failed:', err.message);
        }
      } else {
        console.error('FS operation failed:', error.message);
      }
    }
  } catch (error) {
    console.error('FS operation failed:', error.message);
  }
}

await moveAndRenameFile();
