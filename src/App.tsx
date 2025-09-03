import "./App.css";

import Wrapper from "./Wrapper";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

type ComponentModule = {
  default: React.ComponentType<any>;
};

function App() {
  const components: Record<string, ComponentModule> = import.meta.glob("./components/*/*.tsx", { eager: true });

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
        {Object.entries(components).map(([path, module]) => {
          const Component = module.default;
          return (
            <Wrapper key={path}>
              {Component.name}
              <Component />
            </Wrapper>
          );
        })}
      </div>
    </>
  );
}

export default App;
