import { expose, proxy } from 'comlink';
import { wrapTransfer } from '../util';

async function init() {
  const module = await import('@wasm-sample/multi_threading');
  await module.default();
  await module.initThreadPool(navigator.hardwareConcurrency);

  const { sortParallel } = module;

  return proxy({
    sortParallel: wrapTransfer(sortParallel),
  });
}

expose(init);

export type WorkerInit = typeof init;
