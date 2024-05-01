import { transfer } from "comlink";

function makeRandomArray(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (2 ** 31 - 1)),
  );
}

export const REALLY_BIG_ARRAY = makeRandomArray(10_000_000);

type MaybePromise<T> = T | Promise<T>;

export function wrapTransfer<
  T extends (
    ...args: any[]
  ) => MaybePromise<Awaited<ReturnType<T>> & { buffer: Transferable }>,
>(func: T) {
  return async (...args: Parameters<T>) => {
    const result = await func(...args);
    return transfer(result, [result.buffer]);
  };
}
