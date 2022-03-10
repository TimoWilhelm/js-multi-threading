import { wrap } from 'comlink';
import { useCallback, useState } from 'react';
import { BIG_ARRAY } from '../util';
import { WorkerModule } from './worker';

const worker = wrap<WorkerModule>(
  new Worker(new URL('./worker.ts', import.meta.url)),
);

export function WorkerSample() {
  const [time, setTime] = useState(-1);

  const sortFunction = useCallback(
    async (array: number[]) => {
      const data = [...array]; // copy array to avoid mutation

      console.log(`in: ${data.slice(0, 10).toString()}...`);

      const start = performance.now();
      const result = await worker.sort(data);
      setTime(performance.now() - start);

      console.log(`out: ${result.slice(0, 10).toString()}...`);
    },
    [setTime],
  );

  return (
    <div>
      <h1>Web Worker Sort</h1>
      <div>
        <button
          type="button"
          onClick={async () => {
            await sortFunction(BIG_ARRAY);
          }}
        >
          Sort {BIG_ARRAY.length.toLocaleString()} elements
        </button>
      </div>
      {time > 0 && <div>Duration: {time.toFixed(3)} ms</div>}
    </div>
  );
}
