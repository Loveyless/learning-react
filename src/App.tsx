import { RouterProvider } from "react-router";
import { router } from "@/router/index";
import "./css/App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
