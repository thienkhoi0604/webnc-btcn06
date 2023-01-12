import classes from "./Group.module.css";
import { Layout, Col } from "antd";
import DashboardSider from "../../components/layout/Sider/DashboardSider/DashboardSider";
import DashboardHeader from "../../components/layout/Header/DashboardHeader/DashboardHeader";
import GroupContent from "../../components/layout/Content/GroupContent/GroupContent";

// import Header from "../../components/layout/Header/Header/Header";

const Group = () => {
  return (
    <Layout>
      {/* <Header /> */}
      <DashboardHeader />
      <Layout className={classes["container"]}>
        <Col span={4}>
          <DashboardSider />
        </Col>
        <Col span={20}>
          <GroupContent />
        </Col>
      </Layout>
    </Layout>
  );
};

export default Group;
