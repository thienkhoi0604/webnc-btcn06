import classes from "./Options.module.css";
import { Row, Input, Button } from "antd";
import OptionInput from "../../UI/Input/OptionInput/OptionInput";

const Options = (props) => {
  const { options } = props;

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <>
      <h4>Options</h4>
      <Input.Group>
        {options.map((item, index) => {
          return (
            <Row key={index} className={classes["row-option"]}>
              <OptionInput value={item.value_option} onChange={onChange} />
            </Row>
          );
        })}
      </Input.Group>
      <Row className={classes["btn-add-option"]}>
        <Button
          style={{ width: "100%", height: "40px", backgroundColor: "#dbdce1" }}
        >
          <span className={classes["btn-add-option-text"]}>+ Add option</span>
        </Button>
      </Row>
    </>
  );
};

export default Options;
