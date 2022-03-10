import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PlainJsSample } from './01-plain-js';
import { WorkerSample } from './02-worker';
import { BufferSample } from './03-buffer';
import { SharedArrayBufferSample } from './04-sharedarraybuffer';
import { WasmSample } from './05-wasm';
import { PartyButton } from './util/PartyButton';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/01-plain-js">Plain JS</Link>
                </li>
                <li>
                  <Link to="/02-worker">Worker</Link>
                </li>
                <li>
                  <Link to="/03-buffer">ArrayBuffer</Link>
                </li>
                <li>
                  <Link to="/04-sharedarraybuffer">SharedArrayBuffer</Link>
                </li>
                <li>
                  <Link to="/05-wasm">WASM</Link>
                </li>
              </ul>
            </nav>

            <PartyButton />

            <Routes>
              <Route path="/01-plain-js" element={<PlainJsSample />} />
              <Route path="/02-worker" element={<WorkerSample />} />
              <Route path="/03-buffer" element={<BufferSample />} />
              <Route
                path="/04-sharedarraybuffer"
                element={<SharedArrayBufferSample />}
              />
              <Route path="/05-wasm" element={<WasmSample />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
