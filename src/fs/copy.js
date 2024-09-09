import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const copy = async () => {
    try{
        await fs.cp(`${path.resolve(__dirname, 'files')}`,`${path.resolve(__dirname, 'files_copy')}`,{
            recursive : true,
            force: false,
            errorOnExist : true
        });
        console.log('Files have successfully been copied')
    }
    catch(err){
        console.log('FS operation failed');
    }
};

await copy();