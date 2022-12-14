// import classes from "./OptionInput.module.css";
import { Input } from "antd";

const OptionInput = (props) => {
  const { value, onChange } = props;
  return (
    <Input
      showCount
      maxLength={150}
      onChange={onChange}
      value={value}
      style={{
        width: "80%",
        height: "40px",
      }}
    />
  );
};

export default OptionInput;
