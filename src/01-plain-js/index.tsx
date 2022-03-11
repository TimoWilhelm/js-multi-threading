import { useCallback, useState } from 'react';
import { BIG_ARRAY } from '../util';

export function PlainJsSample() {
  const [time, setTime] = useState(-1);
  const [working, setWorking] = useState(false);

  const sortFunction = useCallback(
    (array: number[]) => {
      setWorking(true);
      const data = [...array]; // copy array to avoid mutation

      console.log(`in: ${data.slice(0, 10).toString()}...`);

      const start = performance.now();
      data.sort();
      setTime(performance.now() - start);

      console.log(`out: ${data.slice(0, 10).toString()}...`);
      setWorking(false);
    },
    [setTime],
  );

  return (
    <div>
      <h1>Plain JS Sort</h1>
      <div>
        <button
          type="button"
          disabled={working}
          onClick={() => {
            sortFunction(BIG_ARRAY);
          }}
        >
          {working
            ? 'Working...'
            : `Sort ${BIG_ARRAY.length.toLocaleString()} elements`}
        </button>
      </div>
      {time > 0 && <div>Duration: {time.toFixed(3)} ms</div>}
    </div>
  );
}
