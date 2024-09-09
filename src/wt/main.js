import * as os from 'os';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Worker, isMainThread } from 'worker_threads';

if (isMainThread) {
    function createWorkers() {
        const numCores = os.cpus().length;
        const results = [];
        let workersFinished = 0;

        function handleMessage(workerIndex, message) {
            results[workerIndex] = message;
            workersFinished++;

            if (workersFinished === numCores) {
                console.log('All workers have finished their tasks.');
                console.log('Results:', results);
            }
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        for (let i = 0; i < numCores; i++) {
            const workerPath = path.join(__dirname, '..', 'wt', 'worker.js');
            const worker = new Worker(workerPath, { workerData: 10 + i });
            worker.on('message', handleMessage.bind(null, i));

            worker.on('error', (error) => {
                results[i] = { status: 'error', data: null };
                console.error(`Worker ${i} error:`, error);
                workersFinished++;

                if (workersFinished === numCores) {
                    console.log('All workers have finished their tasks.');
                    console.log('Results:', results);
                }
            });
        }
    }

    createWorkers();
} else {
    console.error('This script should be run as main.');
}
