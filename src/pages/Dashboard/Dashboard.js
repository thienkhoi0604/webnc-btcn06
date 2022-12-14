import classes from "./Dashboard.module.css";
import { Layout, Col, Modal, Input } from "antd";
import DashboardSider from "../../components/layout/Sider/DashboardSider/DashboardSider";
import DashboardContent from "../../components/layout/Content/DashboardContent/DashboardContent";
import DashboardHeader from "../../components/layout/Header/DashboardHeader/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
import { URL_SERVER } from "../../constants/";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresentation, setNewPresentation] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoPresentation"],
    queryFn: async () => {
      const { data } = await axios.get(`${URL_SERVER}/presentation`);
      return data;
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    const result = await axios.post(`${URL_SERVER}/presentation`, {
      name_pre: newPresentation,
      owner: "Hoang Khoi",
    });
    console.log("result create", result);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Layout>
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
