import { parentPort, workerData } from "worker_threads";

function processData(data) {
    const result = data + 1;
    parentPort.postMessage({ status: 'resolved', data: result });
}

const data = workerData;
processData(data);
