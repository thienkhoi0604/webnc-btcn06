import classes from "./PresentationHeader.module.css";
import { Header } from "antd/es/layout/layout";
import { Input, Space } from "antd";
import { RxArrowLeft } from "react-icons/rx";
import { Button } from "antd/es/radio";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const PresentationHeader = (props) => {
  const { presentation } = props;

  const navaigate = useNavigate();

  return (
    <Header className={classes["header-presentation"]}>
      <Space direction="horizontal">
        <RxArrowLeft
          className={classes["icon-left-arrow"]}
          onClick={() => navaigate("/dashboard")}
        />
        <div className={classes["name-presentation"]}>
          <Input
            value={presentation.name_pre}
            className={classes["header-presentation-input"]}
          />
          <span className={classes["created-by"]}>
            Created by {presentation.owner_pre}
          </span>
        </div>
      </Space>
      <span className={classes["btn-group"]}>
        <Button className={classes["btn-shared"]}>Shared</Button>
        <Button className={classes["btn-present"]}>Present</Button>
      </span>
    </Header>
  );
};

export default memo(PresentationHeader);
