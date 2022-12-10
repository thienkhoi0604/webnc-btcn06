import classes from "./PresentationHeader.module.css";
import { Header } from "antd/es/layout/layout";
import { Input, Space } from "antd";
import { RxArrowLeft } from "react-icons/rx";
import { Button } from "antd/es/radio";

const PresentationHeader = () => {
  return (
    <Header className={classes["header-presentation"]}>
      <Space direction="horizontal">
        <RxArrowLeft className={classes["icon-left-arrow"]} />
        <div className={classes["name-presentation"]}>
          <Input
            value="My First Presentation"
            className={classes["header-presentation-input"]}
          />
          <span className={classes["created-by"]}>Created by tester</span>
        </div>
      </Space>
      <span className={classes["btn-group"]}>
        <Button className={classes["btn-shared"]}>Shared</Button>
        <Button className={classes["btn-present"]}>Present</Button>
      </span>
    </Header>
  );
};

export default PresentationHeader;
