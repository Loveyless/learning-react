import Reducer from "./components/useReducer/useReducer";
import ReducerExample from "./components/useReducer/useReducerExample";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {Reducer.name}
        <Reducer />
        {ReducerExample.name}
        <ReducerExample />
      </div>
    </>
  );
}

export default App;
