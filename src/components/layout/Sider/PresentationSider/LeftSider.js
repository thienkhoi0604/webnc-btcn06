import classes from "./LeftSider.module.css";
import { Layout } from "antd";
import Slide from "../../../Slide/Slide";

const { Sider } = Layout;

const LeftSider = (props) => {
  const { slides, onSelect } = props;

  return (
    <Sider
      width="100%"
      className={classes["left-sider"]}
      style={{
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      {slides &&
        slides.map((item) => {
          return (
            <Slide key={item.id} slide={item} onClick={() => onSelect(item)} />
          );
        })}
    </Sider>
  );
};

export default LeftSider;
