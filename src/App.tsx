import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Wrapper from "./Wrapper";
import UserProfileWithData from "./notAutoImportComponents/HigherOrderComponent/HigherOrderComponent";
import UserProfile from "./notAutoImportComponents/HigherOrderComponent/HigherOrderComponent";

type ComponentModule = {
  default: React.ComponentType<any>;
};

function App() {
  const components: Record<string, ComponentModule> = import.meta.glob("./components/*/*.tsx", { eager: true });

  return (
    <>
      <div className="flex m-2">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {Object.entries(components).map(([path, module]) => {
          const Component = module.default;
          return (
            <Wrapper key={path}>
              {Component.name}
              <Component />
            </Wrapper>
          );
        })}

        <Wrapper>
          {UserProfileWithData.name}
          <UserProfileWithData extraProp="some value" />
        </Wrapper>
        <Wrapper>
          {UserProfile.name}
          <UserProfile userId="234" extraProp="some thing" />
        </Wrapper>
      </div>
    </>
  );
}

export default App;
