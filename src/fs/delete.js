import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const remove = async () => {
  const folderPath = path.resolve(__dirname, 'files'); 
  const filename = 'fileToRemove.txt';
  const filePath = path.join(folderPath, filename);

  try {

    await fs.access(filePath, fs.constants.F_OK);


    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: File does not exist');
    } else {
      console.error('FS operation failed:', error.message);
    }
  }
};

await remove();
