import { RouterProvider } from "react-router";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { router } from "@/router/index";

import Wrapper from "./Wrapper";
import UserProfileWithData from "./notAutoImportComponents/HigherOrderComponent/HigherOrderComponent";
import UserProfile from "./notAutoImportComponents/HigherOrderComponent/HigherOrderComponent";
import ArraySet from "./notAutoImportComponents/test/arraySet/arraySet";

type ComponentModule = {
  default: React.ComponentType<any>;
};

function App() {
  const components: Record<string, ComponentModule> = import.meta.glob("./components/*/*.tsx", { eager: true });

  return (
    <>
      <div className="flex m-2">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
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
        <Wrapper>
          {ArraySet.name}
          <ArraySet />
        </Wrapper>
      </div>
      <div>
        路由导航
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
