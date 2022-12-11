import classes from "./DashboardSider.module.css";
import { Menu, Layout } from "antd";
import { siderDashboardData } from "../../../../mock/dashboard";

const { Sider } = Layout;

const DashboardSider = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Sider width="100%" className={classes["container-sidebar"]}>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[siderDashboardData[0].key]}
        mode="inline"
        items={siderDashboardData}
        className={classes["menu-sidebar"]}
      />
    </Sider>
  );
};

export default DashboardSider;
