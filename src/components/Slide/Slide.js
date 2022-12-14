import classes from "./Slide.module.css";
import { Col, Row, Card, Space, Dropdown } from "antd";
import { RxDragHandleDots2 } from "react-icons/rx";
import { SiSimpleanalytics } from "react-icons/si";
import axios from "axios";
import { URL_SERVER } from "../../constants";

const items = [
  {
    key: "1",
    label: <div>Delete</div>,
  },
];

const Slide = (props) => {
  const { slide, current, onClick } = props;

  const onClickHandler = async (value) => {
    const result = await axios.delete(`${URL_SERVER}/slide/${value.id}`);

    console.log("result delete", result);
  };

  return (
    <div className={classes["container-slide"]}>
      <Card
        bordered={false}
        className={`${classes["card-body"]} ${classes[current]}`}
        bodyStyle={{ padding: "0px" }}
      >
        <Row>
          <Col span={3} className={classes["option-control-slide"]}>
            <div>{slide.id}</div>
            <Dropdown
              menu={{
                items,
                onClick: (e) => onClickHandler(slide),
              }}
              trigger={["click"]}
              placement="bottomLeft"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <RxDragHandleDots2 className={classes["icon-grid-dots"]} />
            </Dropdown>
          </Col>

          <Col flex={10}>
            <Dropdown
              menu={{
                items,
                onClick: (e) => onClickHandler(slide),
              }}
              trigger={["contextMenu"]}
              placement="bottomLeft"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Card
                type="inner"
                className={classes["type-content-slide"]}
                bodyStyle={{ padding: "0px" }}
                onClick={onClick}
              >
                <Space direction="vertical" align="center">
                  <SiSimpleanalytics />
                  {slide.question}
                </Space>
              </Card>
            </Dropdown>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Slide;
