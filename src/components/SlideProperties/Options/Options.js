import classes from "./Options.module.css";
import { Row, Input, Button } from "antd";
import OptionInput from "../../UI/Input/OptionInput/OptionInput";
import { useState } from "react";
import { useOptionsState } from "../../../context/option";

const Options = (props) => {
  const { options, slide } = props;
  const [dataOps, setDataOps] = useState(options);
  const optionsState = useOptionsState();

  const updateOptions = (index) => (e) => {
    const newArray = dataOps.map((item, i) => {
      if (index === i) {
        return { ...item, value_option: e.target.value };
      } else {
        return item;
      }
    });
    setDataOps(newArray);
    optionsState.setInitialValues(newArray);
  };

  return (
    <>
      <h4>Options</h4>
      <Input.Group>
        {dataOps.map((item, index) => {
          return (
            <Row key={index} className={classes["row-option"]}>
              <OptionInput
                value={item.value_option}
                onChange={updateOptions}
                index={index}
              />
            </Row>
          );
        })}
      </Input.Group>
      <Row className={classes["btn-add-option"]}>
        <Button
          style={{ width: "100%", height: "40px", backgroundColor: "#dbdce1" }}
          onClick={(e) => {
            if (dataOps && dataOps.length !== 0) {
              const newValue = {
                id_option: dataOps.length + 1,
                id_slide: dataOps[0].id_slide,
                value_option: "",
                vote: 0,
              };
              const newArray = dataOps.map((item) => item);
              newArray.push(newValue);
              setDataOps(newArray);
            } else {
              const newValue = {
                id_option: dataOps.length + 1,
                id_slide: slide.id,
                value_option: "",
                vote: 0,
              };
              const newArray = dataOps.map((item) => item);
              newArray.push(newValue);
              setDataOps(newArray);
            }

            console.log(dataOps);
          }}
        >
          <span className={classes["btn-add-option-text"]}>+ Add option</span>
        </Button>
      </Row>
    </>
  );
};

export default Options;
