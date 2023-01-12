import classes from "./GroupInfo.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { URL_SERVER } from "../../constants";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { message } from "antd";

function Row(props) {
  const { idGroup } = props;
  const [noti, setNoti] = React.useState({ err: "", success: "" });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [`repoListMembersDetail`],
    queryFn: async () => {
      const { data } = await axios.get(
        `${URL_SERVER}/group/getinfo/${idGroup}`
      );
      return data;
    },
  });

  React.useEffect(() => {
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

  const onDeleteMemberHandler = async (idUser) => {
    try {
      await axios
        .post(`${URL_SERVER}/group/delete`, {
          idGroup: idGroup,
          idUser: idUser,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setNoti({ ...noti, success: res.data.msg });
            navigate("/groups");
          } else {
            setNoti({ ...noti, err: res.data.msg });
          }
        });
      navigate(`/groups`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      {contextHolder}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Box sx={{ margin: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ fontSize: "2rem" }}
            >
              Members
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                    Fullname
                  </TableCell>
                  <TableCell style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                    Role
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontSize: "1.6rem", fontWeight: "700" }}
                  >
                    Telephone
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((mem, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontSize: "1.6rem" }}
                      >
                        {mem.account.email}
                      </TableCell>
                      <TableCell style={{ fontSize: "1.6rem" }}>
                        {mem.account.fullname}
                      </TableCell>
                      <TableCell style={{ fontSize: "1.6rem" }}>
                        {mem.role}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: "1.6rem" }}>
                        {mem.account.telephone}
                      </TableCell>
                      <TableCell align="right">
                        <ClearOutlinedIcon
                          onClick={(e) => onDeleteMemberHandler(mem.account.id)}
                        />
                        {/* <Link to={`/groups/${idGroup}`}>

                        </Link> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function GroupInfo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [noti, setNoti] = React.useState({ err: "", success: "" });
  const authentication = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
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
      const result = await axios.post(`${URL_SERVER}/group/deleteAllMember`, {
        idGroup: params.idGroup,
      });
      if (result.status >= 200 && result.status < 300) {
        setNoti({ ...noti, success: result.data.msg });
        navigate("/groups");
      } else {
        setNoti({ ...noti, err: result.data.msg });
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <TableContainer component={Paper} className={classes["table-container"]}>
      {contextHolder}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {/* <TableCell align="left">Member group</TableCell> */}
            <TableCell align="right">
              <Button onClick={showModal}>Delete group</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row idGroup={params.idGroup} />
        </TableBody>
      </Table>
      <Modal
        title="Do you want to delete this group?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </TableContainer>
  );
}
