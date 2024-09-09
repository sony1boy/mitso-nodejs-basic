import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversedChunk = chunk.toString().trim();
            if (reversedChunk.toLowerCase() === 'exit') {
                process.exit();
            }
            const reversedText = reversedChunk.split('').reverse().join('');
            this.push(reversedText + '\n');
            callback();
        }
    });

    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();