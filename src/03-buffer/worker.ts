import { expose, transfer } from 'comlink';

function sort(array: Int32Array) {
  return transfer(array.sort(), [array.buffer]);
}

const module = { sort };

expose(module);

export type WorkerModule = typeof module;
