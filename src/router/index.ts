import { createBrowserRouter } from "react-router";
import Home from "@/views/Home";
import About from "@/views/About";
import NotFound from "@/views/404";
import Layout from "@/layout/index";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true, // 默认路由
        path: "/home", // 静态路由
        Component: Home,
      },
      {
        path: "/about/:id", // 动态路由
        Component: About,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
