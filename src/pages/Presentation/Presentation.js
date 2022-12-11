import classes from "./Presentation.module.css";
import { Layout, Col, Row, Button } from "antd";
import { RiUpload2Line } from "react-icons/ri";
import PresentationHeader from "../../components/layout/Header/PresentationHeader/PresentationHeader";
import LeftSider from "../../components/layout/Sider/PresentationSider/LeftSider";
import RightSider from "../../components/layout/Sider/PresentationSider/RightSider";
import ContentPresentation from "../../components/layout/Content/ContentPresentation/ContentPresentation";

const { Content } = Layout;

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
            <LeftSider />
          </Col>

          <Col span={12}>
            <Content className={classes["main-content"]}>
              <ContentPresentation />
            </Content>
          </Col>

          <Col span={8}>
            <RightSider />
          </Col>
        </Layout>
      </Layout>
    </>
  );
};

export default Presentation;
