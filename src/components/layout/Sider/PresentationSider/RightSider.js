import classes from "./RightSider.module.css";
import { Layout, Space } from "antd";
import SlideProperties from "../../../SlideProperties/SlideProperties";

const { Sider } = Layout;

const RightSider = () => {
  return (
    <Sider
      width="100%"
      className={classes["right-sider"]}
      style={{
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <Space direction="vertical" align="center" style={{ width: "100%" }} wrap>
        <SlideProperties />
      </Space>
    </Sider>
  );
};

export default RightSider;
