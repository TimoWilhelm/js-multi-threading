import { Remote, transfer, wrap } from 'comlink';
import { useCallback, useEffect, useState } from 'react';
import { REALLY_BIG_ARRAY } from '../util';
import { WorkerInit } from './worker';

type AsyncReturnType<T extends (...args: any[]) => Promise<unknown>> =
  T extends (...args: any[]) => Promise<infer R> ? R : never;

export function WasmSample() {
  const [time, setTime] = useState(-1);
  const [working, setWorking] = useState(false);
  const [module, setModule] = useState<{
    instance: Remote<AsyncReturnType<WorkerInit>>;
  }>();

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url));
    const init = wrap<WorkerInit>(worker);

    (async () => {
      // Wrapping is necessary because the comlink Remote proxy object
      // cannot be directly assigned to a react state variable.
      setModule({ instance: await init() });
    })();

    return () => {
      worker.terminate();
    };
  }, []);

  const sortFunction = useCallback(
    async (array: number[]) => {
      if (!module) {
        throw new Error('Worker not initialized');
      }
      setWorking(true);
      const data = new Int32Array(array);

      console.log(`in: ${data.slice(0, 10).toString()}...`);

      const start = performance.now();

      // --- WORK ---

      const result = await module.instance.sortParallel(
        transfer(data, [data.buffer]),
      );

      // --- END WORK ---

      setTime(performance.now() - start);

      console.log(`out: ${result.slice(0, 10).toString()}...`);
      setWorking(false);
    },
    [module, setTime],
  );

  if (!module) {
    return <div>Loading Worker...</div>;
  }

  return (
    <div>
      <h1>Rayon Sample</h1>
      <div>
        <button
          type="button"
          disabled={working}
          onClick={async () => {
            sortFunction(REALLY_BIG_ARRAY);
          }}
        >
          {working
            ? 'Working...'
            : `Sort ${REALLY_BIG_ARRAY.length.toLocaleString()} elements`}
        </button>
      </div>
      {time > 0 && <div>Duration: {time.toFixed(3)} ms</div>}
    </div>
  );
}
