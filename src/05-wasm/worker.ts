import { expose, proxy, transfer } from 'comlink';

function wrapTransfer<
  TArgs extends unknown[],
  TResult extends { buffer: Transferable },
>(func: (...args: [...TArgs]) => TResult) {
  return (...args: [...TArgs]) => {
    const result = func(...args);
    return transfer(result, [result.buffer]);
  };
}

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
