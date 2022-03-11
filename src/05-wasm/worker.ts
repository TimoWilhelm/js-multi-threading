import { expose, proxy, transfer } from 'comlink';

function wrapTransfer<
  T extends (...args: any[]) => ReturnType<T> & { buffer: Transferable },
>(func: T) {
  return (...args: Parameters<T>) => {
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
