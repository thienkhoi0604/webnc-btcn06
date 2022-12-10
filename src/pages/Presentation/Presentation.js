import classes from "./Presentation.module.css";
import { Layout, Col, Row, Space, Button } from "antd";
import Slide from "../../components/Slide/Slide";
import SlideProperties from "../../components/SlideProperties/SlideProperties";
import PresentationContent from "../../components/PresentationContent/PresentationContent";
import { RiUpload2Line } from "react-icons/ri";
import PresentationHeader from "../../components/layout/Header/PresentationHeader/PresentationHeader";

const { Content, Sider } = Layout;
const Presentation = () => {
  return (
    <>
      <Layout className={classes["container-presentation"]}>
        <PresentationHeader />

        <Row className={classes["row-menu-btn"]}>
          <Button className={`${classes["btn-add"]} ${classes["primary"]}`}>
            + New Slide
          </Button>
          <Button className={`${classes["btn-import"]} ${classes["grey"]}`}>
            <RiUpload2Line className={classes["icon"]} />
            Import
          </Button>
        </Row>

        <Layout className={classes["layout-inner"]}>
          <Col span={4}>
            <Sider
              width="100%"
              className={classes["left-sider"]}
              style={{
                overflowY: "scroll",
                height: "100vh",
              }}
            >
              <Slide current="current-slide" />
              <Slide />
              <Slide />
              <Slide />
              <Slide />
              <Slide />
            </Sider>
          </Col>

          <Col span={12}>
            <Content className={classes["main-content"]}>
              <PresentationContent />
            </Content>
          </Col>

          <Col span={8}>
            <Sider
              width="100%"
              className={classes["right-sider"]}
              style={{
                overflowY: "auto",
                height: "100vh",
              }}
            >
              <Space
                direction="vertical"
                align="center"
                style={{ width: "100%" }}
                wrap
              >
                <SlideProperties />
              </Space>
            </Sider>
          </Col>
        </Layout>
      </Layout>
    </>
  );
};

export default Presentation;
