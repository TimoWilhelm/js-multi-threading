import { useCallback, useState } from 'react';
import { BIG_ARRAY } from '../util';

export function PlainJsSample() {
  const [time, setTime] = useState(-1);

  const sortFunction = useCallback(
    (array: number[]) => {
      const data = [...array]; // copy array to avoid mutation

      console.log(`in: ${data.slice(0, 10).toString()}...`);
      const start = performance.now();
      data.sort();
      setTime(performance.now() - start);
      console.log(`out: ${data.slice(0, 10).toString()}...`);
    },
    [setTime],
  );

  return (
    <div>
      <h1>Plain JS Sort</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            sortFunction(BIG_ARRAY);
          }}
        >
          Sort {BIG_ARRAY.length.toLocaleString()} elements
        </button>
      </div>
      {time > 0 && <div>Duration: {time.toFixed(3)} ms</div>}
    </div>
  );
}
