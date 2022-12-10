// import classes from "./OptionInput.module.css";
import { Input } from "antd";

const OptionInput = (props) => {
  const { onChange } = props;
  return (
    <Input
      showCount
      maxLength={150}
      onChange={onChange}
      style={{
        width: "80%",
        height: "40px",
      }}
    />
  );
};

export default OptionInput;
