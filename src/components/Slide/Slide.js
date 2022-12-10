import classes from "./Slide.module.css";
import { Col, Row, Card, Space, Button, Dropdown } from "antd";
import { RxDragHandleDots2 } from "react-icons/rx";
import { SiSimpleanalytics } from "react-icons/si";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const Slide = (props) => {
  const { current } = props;
  return (
    <div className={classes["container-slide"]}>
      <Card
        bordered={false}
        className={`${classes["card-body"]} ${classes[current]}`}
        bodyStyle={{ padding: "0px" }}
      >
        <Row>
          <Col span={3} className={classes["option-control-slide"]}>
            <div>1</div>
            <Dropdown
              menu={{
                items,
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
              >
                <Space direction="vertical" align="center">
                  <SiSimpleanalytics />
                  Inner Card content
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
