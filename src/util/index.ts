function makeRandomArray(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (2 ** 31 - 1)),
  );
}

export const BIG_ARRAY = makeRandomArray(1_000_000);
export const REALLY_BIG_ARRAY = makeRandomArray(10_000_000);
