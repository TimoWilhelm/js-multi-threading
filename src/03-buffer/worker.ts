import { expose, transfer } from 'comlink';

function sort(array: Int32Array) {
  return transfer(
    array.sort((a, b) => a - b),
    [array.buffer],
  );
}

const module = { sort };

expose(module);

export type WorkerModule = typeof module;
