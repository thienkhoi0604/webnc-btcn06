import classes from "./Dashboard.module.css";
import { Layout, Col } from "antd";
import DashboardSider from "../../components/layout/Sider/DashboardSider/DashboardSider";
import DashboardContent from "../../components/layout/Content/DashboardContent/DashboardContent";
import DashboardHeader from "../../components/layout/Header/DashboardHeader/DashboardHeader";

const Dashboard = () => {
  return (
    <Layout>
      <DashboardHeader />
      <Layout className={classes["container"]}>
        <Col span={4}>
          <DashboardSider />
        </Col>
        <Col span={20}>
          <DashboardContent />
        </Col>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
