import { expose } from 'comlink';

function sort(array: number[]) {
  return array.sort((a, b) => a - b);
}

const module = { sort };

expose(module);

export type WorkerModule = typeof module;
