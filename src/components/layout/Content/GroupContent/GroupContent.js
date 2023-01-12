import classes from "./GroupContent.module.css";
import { useState, useEffect } from "react";
import CollapsibleTable from "../../../Table/Table";
import axios from "axios";
import { URL_SERVER } from "../../../../constants";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Input } from "antd";
import { useSelector } from "react-redux";
import { message } from "antd";
// import { useSelector } from "react-redux";

const GroupContent = () => {
  const [groupMember, setGroupMember] = useState([]);
  const [groupOwner, setGroupOwner] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  const [noti, setNoti] = useState({ err: "", success: "" });
  const [messageApi, contextHolder] = message.useMessage();
  const authentication = useSelector((state) => state.auth);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoGetGroupOfUserss"],
    queryFn: async () => {
      const res = await axios.get(
        `${URL_SERVER}/group/${authentication.userLogin.email}`
      );
      console.log(res);
      return res.data;
    },
  });

  useEffect(() => {
    const splitGroup = () => {
      if (data && Array.isArray(data)) {
        const member = data.filter((element) => {
          return element.role.trim() === "member";
        });
        const owner = data.filter((element) => {
          return element.role.trim() !== "member";
        });
        setGroupMember(member);
        setGroupOwner(owner);
      }
    };
    splitGroup();
    return () => {
      setGroupMember([]);
      setGroupOwner([]);
    };
  }, [data]);

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
    if (authentication.isLogged) {
      const result = await axios.post(`${URL_SERVER}/inforgroup/create`, {
        email: authentication.userLogin.email,
        name: newGroup,
      });
      if (result.status >= 200 && result.status < 300) {
        setNoti({ ...noti, success: result.data.msg });
      } else {
        setNoti({ ...noti, err: result.data.msg });
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return "Loading";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={classes["homepage-container"]}>
      <h1>HOME PAGE</h1>
      {contextHolder}
      <div>
        {groupMember.length !== 0 ? (
          <div>
            <h3>Group you are member</h3>
            <CollapsibleTable data={groupMember} auth={false} />
          </div>
        ) : (
          <h3>You don't have role "member" in any group</h3>
        )}
        {groupOwner.length !== 0 ? (
          <div>
            <h3 className={classes["title-table"]}>Group you created</h3>
            <CollapsibleTable data={groupOwner} auth={true} />
          </div>
        ) : (
          <div>
            <h3>You don't have role "owner" or "co-owner" in any group</h3>
            <Button onClick={showModal}>Create group</Button>

            <Modal
              title="Input name for new group"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
              />
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupContent;
