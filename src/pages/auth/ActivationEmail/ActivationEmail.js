import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_SERVER } from "../../../constants";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const { isLoading, error } = useQuery(["repoActivation"], async () => {
    let result = "";
    if (activation_token) {
      try {
        console.log("count");
        const res = await axios.post(`${URL_SERVER}/user/activation`, {
          activation_token,
        });
        setSuccess(res.data.msg);
        result = success;
      } catch (err) {
        if (err.response.data.msg) {
          setErr(err.response.data.msg);
          result = err;
        } else {
          console.log(err);
        }
      }
    }
    return result;
  });

  //   useEffect(() => {
  //     console.log("activation", activation_token);
  //     if (activation_token) {
  //       const activationEmail = async () => {
  //         try {
  //           console.log("count");
  //           const res = await axios.post(`${URL_SERVER}/user/activation`, {
  //             activation_token,
  //           });
  //           setSuccess(res.data.msg);
  //         } catch (err) {
  //           err.response.data.msg && setErr(err.response.data.msg);
  //           if (err.response.data.msg) {
  //             setErr(err.response.data.msg);
  //           } else {
  //             console.log(err);
  //           }
  //         }
  //       };
  //       activationEmail();
  //     }
  //   }, [activation_token]);

  useEffect(() => {
    const notification = (type, value) => {
      messageApi.open({
        type: type,
        content: value,
      });
    };
    if (success !== "") {
      notification("success", success);
    }
  }, [err, success, messageApi]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <div className="active_page">{contextHolder}</div>;
};

export default ActivationEmail;
