import classes from "./DetailGroup.module.css";
import GroupInfo from "../../components/GroupInfo/GroupInfo";
import CustomizedTables from "../../components/UserTable/UserTable";
import { Layout, Col } from "antd";
import DashboardSider from "../../components/layout/Sider/DashboardSider/DashboardSider";
import DashboardHeader from "../../components/layout/Header/DashboardHeader/DashboardHeader";

const DetailGroup = () => {
  return (
    <Layout>
      {/* <Header /> */}
      <DashboardHeader />
      <Layout className={classes["container"]}>
        <Col span={4}>
          <DashboardSider />
        </Col>
        <Col span={20}>
          <div>
            <h1 className={classes["heading-1"]}>GROUP DETAIL</h1>
            <GroupInfo />
            <h3 className={classes["heading-3"]}>List members</h3>
            <CustomizedTables />
          </div>
        </Col>
      </Layout>
    </Layout>
  );
};

export default DetailGroup;
