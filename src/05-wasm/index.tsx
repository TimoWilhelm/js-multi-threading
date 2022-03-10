import { Remote, transfer, wrap } from 'comlink';
import { useCallback, useEffect, useState } from 'react';
import { REALLY_BIG_ARRAY } from '../util';
import { WorkerInit } from './worker';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

const initWorker = wrap<WorkerInit>(
  new Worker(new URL('./worker.ts', import.meta.url)),
);

export function WasmSample() {
  const [time, setTime] = useState(-1);
  const [worker, setWorker] = useState<{
    instance: Remote<AsyncReturnType<WorkerInit>>;
  }>();

  useEffect(() => {
    (async () => {
      const worker = await initWorker();
      setWorker({ instance: worker });
    })();
  }, []);

  const sortFunction = useCallback(
    async (array: number[]) => {
      if (!worker) {
        throw new Error('Worker not initialized');
      }
      const data = new Int32Array(array);

      console.log(`in: ${data.slice(0, 10).toString()}...`);

      const start = performance.now();
      const result = await worker.instance.sortParallel(
        transfer(data, [data.buffer]),
      );
      setTime(performance.now() - start);

      console.log(`out: ${result.slice(0, 10).toString()}...`);
    },
    [worker, setTime],
  );

  if (!worker) {
    return <div>Loading Worker...</div>;
  }

  return (
    <div>
      <h1>Rayon Sample</h1>
      <div>
        <button
          type="button"
          onClick={async () => {
            sortFunction(REALLY_BIG_ARRAY);
          }}
        >
          Sort {REALLY_BIG_ARRAY.length.toLocaleString()} elements
        </button>
      </div>
      {time > 0 && <div>Duration: {time.toFixed(3)} ms</div>}
    </div>
  );
}