import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const folderPath = path.join(__dirname, 'files');

const list = async () => {
  try {

    await fs.access(folderPath, fs.constants.F_OK);

    const fileNames = await fs.readdir(folderPath);

    console.log('File names in "files" folder:', fileNames);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('FS operation failed: Folder does not exist');
    } else {
      console.error('FS operation failed:', error.message);
    }
  }
};


await list();
