import classes from "./Participant.module.css";
import { useState } from "react";
import { Layout, Space, Image, Radio, Button } from "antd";
import { Content } from "antd/es/layout/layout";

const Participant = (props) => {
  const { slide } = props;
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Layout style={{ background: "white" }}>
      <Content style={{ marginBottom: "70px" }}>
        <Space direction="vertical" className={classes["container"]}>
          <h1 className={classes["logo-name"]}>Mentimeter</h1>
          <Image
            src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
            className={classes["img"]}
            preview={{
              maskClassName: classes["check"],
            }}
          />
          <h3 className={classes["presentation-name"]}>Multiple choice</h3>
          <p className={classes["description"]}>
            longer description longer description longer description longer
            description longer description{" "}
          </p>
          <Radio.Group
            onChange={onChange}
            value={value}
            className={classes["radio-group"]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Radio value={1} className={classes["radio-selection"]}>
                1
              </Radio>
              <Radio value={2} className={classes["radio-selection"]}>
                2
              </Radio>
              <Radio value={3} className={classes["radio-selection"]}>
                3
              </Radio>
            </Space>
          </Radio.Group>
          <Button className={classes["btn-submit"]}>Submit</Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default Participant;
