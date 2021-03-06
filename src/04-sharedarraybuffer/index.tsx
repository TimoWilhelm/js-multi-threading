import { wrap } from 'comlink';
import { useCallback, useState } from 'react';
import { REALLY_BIG_ARRAY } from '../util';
import { WorkerModule } from './worker';

const worker = wrap<WorkerModule>(
  new Worker(new URL('./worker.ts', import.meta.url)),
);

export function SharedArrayBufferSample() {
  const [time, setTime] = useState(-1);
  const [working, setWorking] = useState(false);

  const sortFunction = useCallback(
    async (array: number[]) => {
      setWorking(true);
      const buffer = new SharedArrayBuffer(
        array.length * Int32Array.BYTES_PER_ELEMENT,
      );
      const data = new Int32Array(buffer);
      data.set(array, 0);

      console.log(`in: ${data.slice(0, 10).toString()}...`);

      const start = performance.now();

      // --- WORK ---

      await worker.sort(data);

      // --- END WORK ---

      setTime(performance.now() - start);

      console.log(`out: ${data.slice(0, 10).toString()}...`);
      setWorking(false);
    },
    [setTime],
  );

  return (
    <div>
      <h1>Web Worker Sort (with shared array buffer)</h1>
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
