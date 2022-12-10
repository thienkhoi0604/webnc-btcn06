import classes from "./ResultLayout.module.css";
import PresentationButton from "../../UI/Button/PresentationButton/PresentationButton";
import { Space } from "antd";
import {
  RiBarChartFill,
  RiDonutChartFill,
  RiPieChartFill,
} from "react-icons/ri";
import { AiOutlineDotChart } from "react-icons/ai";

const ResultLayout = () => {
  return (
    <>
      <h4 className={classes["heading"]}>Result Layout</h4>
      <Space
        direction="horizontal"
        className={classes["btn-group-result-type"]}
        wrap
      >
        <PresentationButton
          icon={
            <RiBarChartFill className={classes["btn-group-result-type-icon"]} />
          }
          current={true}
        >
          Bar
        </PresentationButton>
        <PresentationButton
          icon={
            <RiDonutChartFill
              className={classes["btn-group-result-type-icon"]}
            />
          }
        >
          Donut
        </PresentationButton>
        <PresentationButton
          icon={
            <RiPieChartFill className={classes["btn-group-result-type-icon"]} />
          }
        >
          Pie
        </PresentationButton>
        <PresentationButton
          icon={
            <AiOutlineDotChart
              className={classes["btn-group-result-type-icon"]}
            />
          }
        >
          Dots
        </PresentationButton>
      </Space>
    </>
  );
};

export default ResultLayout;
