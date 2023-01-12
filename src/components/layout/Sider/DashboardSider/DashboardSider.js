import classes from "./DashboardSider.module.css";
import { Menu, Layout } from "antd";
import { siderDashboardData } from "../../../../mock/dashboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

const DashboardSider = () => {
  const [siderSelected, setSiderSelected] = useState("my-presentations");
  const navigate = useNavigate();

  const onClick = (e) => {
    switch (e.key) {
      case "my-presentations":
        setSiderSelected("my-presentations");
        navigate("/");
        break;
      case "groups":
        setSiderSelected("groups");
        navigate("/groups");
        break;
      default:
        setSiderSelected("my-presentations");
        navigate("/");
        break;
    }
  };
  return (
    <Sider width="100%" className={classes["container-sidebar"]}>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[siderSelected]}
        mode="inline"
        selectedKeys={[siderSelected]}
        items={siderDashboardData}
        className={classes["menu-sidebar"]}
      />
    </Sider>
  );
};

export default DashboardSider;
