import classes from "./DashboardHeader.module.css";
import { Layout, Button, Space } from "antd";
import axios from "axios";

const { Header } = Layout;

const DashboardHeader = () => {
  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/login";
    } catch (err) {
      window.location.href = "/login";
    }
  };
  return (
    <Header className={classes["header"]}>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className={classes["header-name"]}>Mentimeter</div>
        <Button style={{ float: "right" }} onClick={handleLogout}>
          Logout
        </Button>
      </Space>
    </Header>
  );
};
export default DashboardHeader;
