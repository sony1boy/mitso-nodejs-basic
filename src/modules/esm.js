import { createServer as createServerHttp } from 'http';
import { release, version } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

// Получение абсолютного пути к текущему файлу и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Формирование относительных путей к JSON-файлам
const aJSONPath = path.join(__dirname, 'files', 'a.json');
const bJSONPath = path.join(__dirname, 'files', 'b.json');

// Функция для динамической загрузки JSON-файлов
async function loadJSON(filePath) {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

// Загрузка JSON-файлов
const aJSON = await loadJSON(aJSONPath);
const bJSON = await loadJSON(bJSONPath);

// Импорт скрипта c.js
import './files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = aJSON;
} else {
    unknownObject = bJSON;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3020;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { myServer, unknownObject };
