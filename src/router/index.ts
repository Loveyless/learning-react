import { createBrowserRouter } from "react-router";
import Home from "@/views/Home";
import About from "@/views/About";
import NotFound from "@/views/404";
import Layout from "@/layout/index";
import Langchain from "@/views/langchain/index";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true, // 默认路由
        Component: Langchain,
      },
      {
        path: "langchain",
        Component: Langchain,
      },
      {
        path: "home", // 静态路由 在子路由中，推荐使用相对路径 "home" 而不是 "/home"
        Component: Home,
      },
      {
        path: "about/:id", // 动态路由
        Component: About,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
