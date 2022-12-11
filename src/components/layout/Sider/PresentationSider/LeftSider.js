import classes from "./LeftSider.module.css";
import { Layout } from "antd";
import Slide from "../../../Slide/Slide";

const { Sider } = Layout;

const LeftSider = () => {
  return (
    <Sider
      width="100%"
      className={classes["left-sider"]}
      style={{
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      <Slide current="current-slide" />
      <Slide />
      <Slide />
      <Slide />
      <Slide />
      <Slide />
    </Sider>
  );
};

export default LeftSider;
