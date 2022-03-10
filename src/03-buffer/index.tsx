import { transfer, wrap } from 'comlink';
import { useCallback, useState } from 'react';
import { REALLY_BIG_ARRAY } from '../util';
import { WorkerModule } from './worker';

const worker = wrap<WorkerModule>(
  new Worker(new URL('./worker.ts', import.meta.url)),
);

export function BufferSample() {
  const [time, setTime] = useState(-1);

  const sortFunction = useCallback(
    async (array: number[]) => {
      const data = new Int32Array(array);

      console.log(`in: ${data.slice(0, 10).toString()}...`);

      const start = performance.now();
      const result = await worker.sort(transfer(data, [data.buffer]));
      setTime(performance.now() - start);

      console.log(`out: ${result.slice(0, 10).toString()}...`);
    },
    [setTime],
  );

  return (
    <div>
      <h1>Web Worker Sort (with buffer transfer)</h1>
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
