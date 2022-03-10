import { expose } from 'comlink';

function sort(array: Int32Array) {
  array.sort();
}

const module = { sort };

expose(module);

export type WorkerModule = typeof module;
