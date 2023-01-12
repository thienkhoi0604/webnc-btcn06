import classes from "./UserTable.module.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL_SERVER } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const params = useParams();
  const { idGroup } = params;
  const [userList, setUserList] = React.useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [notification, setNotification] = React.useState({
    err: "",
    success: "",
  });

  useQuery({
    queryKey: [`listMembers${idGroup}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `${URL_SERVER}/group/getinfo/${idGroup}`
      );
      return data;
    },
  });

  useQuery({
    queryKey: [`listUsers`],
    queryFn: async () => {
      const { data } = await axios.get(`${URL_SERVER}/user/get`);
      setUserList(data);
      return data;
    },
  });

  React.useEffect(() => {
    const noti = (type, value) => {
      messageApi.open({
        type: type,
        content: value,
      });
    };

    if (notification.err !== "") {
      noti("error", notification.err);
    }
    if (notification.success !== "") {
      noti("success", notification.success);
    }
  }, [notification.err, notification.success, messageApi]);

  const sendInvitation = async (email) => {
    try {
      await axios
        .post(`${URL_SERVER}/group/send/invitation`, {
          id_group: params.idGroup,
          email: email,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setNotification({ ...notification, success: res.msg });
          }
        });
    } catch (error) {
      if (error.response.data.msg) {
        setNotification({
          ...notification,
          err: error.response.data.msg,
          success: "",
        });
      } else {
        console.log("error: ", error);
      }
    }
  };

  return (
    <TableContainer component={Paper} className={classes["table-container"]}>
      {contextHolder}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ fontSize: "1.6rem" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontSize: "1.6rem" }}>
              Full Name
            </StyledTableCell>
            <StyledTableCell align="right" style={{ fontSize: "1.6rem" }}>
              Telephone
            </StyledTableCell>
            <StyledTableCell
              align="right"
              style={{ fontSize: "1.6rem" }}
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList &&
            userList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">{row.fullname}</StyledTableCell>
                <StyledTableCell align="right">{row.telephone}</StyledTableCell>
                <StyledTableCell align="right">
                  <AddIcon
                    className={classes["icon-add"]}
                    onClick={(e) => sendInvitation(row.email)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
