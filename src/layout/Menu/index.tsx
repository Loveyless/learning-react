import { useNavigate } from "react-router";

import { Menu as AntdMenu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

export default function Menu() {
  const navigate = useNavigate(); //编程式导航
  const handleClick: MenuProps["onClick"] = (info) => {
    navigate(info.key); // 点击菜单项时，导航到对应的页面
  };
  const menuItems = [
    {
      key: "/home",
      label: "Home",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/about/313231dadada",
      label: "About",
      icon: <AppstoreOutlined />,
    },
  ];
  return <AntdMenu onClick={handleClick} style={{ height: "100vh" }} items={menuItems} />;
}
