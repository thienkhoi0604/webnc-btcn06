import classes from "./Dashboard.module.css";
import { Layout, Col, Modal, Input } from "antd";
import DashboardSider from "../../components/layout/Sider/DashboardSider/DashboardSider";
import DashboardContent from "../../components/layout/Content/DashboardContent/DashboardContent";
import DashboardHeader from "../../components/layout/Header/DashboardHeader/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
import { URL_SERVER } from "../../constants/";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
// import Header from "../../components/layout/Header/Header/Header";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresentation, setNewPresentation] = useState("");
  const auth = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [noti, setNoti] = useState({ err: "", success: "" });

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoPresentation"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL_SERVER}/presentation`, {
        params: { email: auth.userLogin.email },
      });
      return data;
    },
  });

  useEffect(() => {
    const notification = (type, value) => {
      messageApi.open({
        type: type,
        content: value,
      });
    };

    if (noti.err !== "") {
      notification("error", noti.err);
    }
    if (noti.success !== "") {
      notification("success", noti.success);
    }
  }, [noti.err, noti.success, messageApi]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    const result = await axios.post(`${URL_SERVER}/presentation/`, {
      name_pre: newPresentation,
      email: auth.userLogin.email,
    });
    if (result.status >= 200 && result.status < 300) {
      setNoti({ ...noti, success: result.data.msg });
    } else {
      setNoti({ ...noti, err: result.data.msg });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
      {/* <Header /> */}
      {contextHolder}
      <DashboardHeader />
      <Layout className={classes["container"]}>
        <Col span={4}>
          <DashboardSider />
        </Col>
        <Col span={20}>
          <DashboardContent presentationsData={data} onShowModal={showModal} />
        </Col>
      </Layout>
      <Modal
        title="Create new presentation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={newPresentation}
          onChange={(e) => setNewPresentation(e.target.value)}
        />
      </Modal>
    </Layout>
  );
};

export default Dashboard;
