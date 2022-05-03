function makeRandomArray(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (2 ** 31 - 1)),
  );
}

export const REALLY_BIG_ARRAY = makeRandomArray(10_000_000);
