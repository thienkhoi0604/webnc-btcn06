import classes from "./DashboardHeader.module.css";
import { Layout } from "antd";

const { Header } = Layout;

const DashboardHeader = () => {
  return (
    <Header className={classes["header"]}>
      <div className={classes["header-name"]}>Mentimeter</div>
    </Header>
  );
};
export default DashboardHeader;
