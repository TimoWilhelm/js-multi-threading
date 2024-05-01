import { expose } from 'comlink';
import { wrapTransfer } from '../util';

function sort(array: Int32Array) {
  return array.sort((a, b) => a - b);
}

const module = { sort: wrapTransfer(sort) };

expose(module);

export type WorkerModule = typeof module;
