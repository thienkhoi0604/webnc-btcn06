import classes from "./Presentation.module.css";
import { Layout, Col, Row, Button } from "antd";
import { RiUpload2Line } from "react-icons/ri";
import PresentationHeader from "../../components/layout/Header/PresentationHeader/PresentationHeader";
import LeftSider from "../../components/layout/Sider/PresentationSider/LeftSider";
import RightSider from "../../components/layout/Sider/PresentationSider/RightSider";
import ContentPresentation from "../../components/layout/Content/ContentPresentation/ContentPresentation";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_SERVER } from "../../constants";

const { Content } = Layout;

const Presentation = (props) => {
  const params = useParams();
  const [presentation, setPresentation] = useState({});
  const [slide, setSlide] = useState(null);
  const [selected, setSelected] = useState(null);

  const { isLoading, error } = useQuery({
    queryKey: [`repoPresentation${params.idPresentation}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `${URL_SERVER}/presentation/${params.idPresentation}`
      );
      setPresentation(data);
      return data;
    },
  });

  useQuery({
    queryKey: [`repoSlide${params.idPresentation}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `${URL_SERVER}/slide/${params.idPresentation}`
      );
      setSlide(data);
      return data;
    },
  });

  const onSelectSlideHandler = (value) => {
    setSelected(value);
  };

  const onNewSlide = async () => {
    const result = await axios.post(`${URL_SERVER}/slide`, {
      id_presentation: presentation.id,
    });
    console.log("result create", result);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout className={classes["container-presentation"]}>
      <PresentationHeader presentation={presentation} />
      <Row className={classes["row-menu-btn"]}>
        <Button
          className={`${classes["btn-add"]} ${classes["primary"]}`}
          onClick={onNewSlide}
        >
          + New Slide
        </Button>
        <Button className={`${classes["btn-import"]} ${classes["grey"]}`}>
          <RiUpload2Line className={classes["icon"]} />
          Import
        </Button>
      </Row>

      <Layout className={classes["layout-inner"]}>
        <Col span={4}>
          <LeftSider slides={slide} onSelect={onSelectSlideHandler} />
        </Col>

        <Col span={12}>
          <Content className={classes["main-content"]}>
            {selected && <ContentPresentation slide={selected} />}
          </Content>
        </Col>

        <Col span={8}>{selected && <RightSider slide={selected} />}</Col>
      </Layout>
    </Layout>
  );
};

export default Presentation;
