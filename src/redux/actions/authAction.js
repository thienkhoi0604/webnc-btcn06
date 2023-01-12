import ACTIONS from "./index";
import axios from "axios";
import { URL_SERVER } from "../../constants";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchUser = async (token) => {
  const res = await axios.get(`${URL_SERVER}/user/infor`, {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetUser = (res) => {
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};

export const dispatchUserLogin = (element) => {
  return {
    type: ACTIONS.USER_LOGIN,
    payload: {
      email: element.email,
      password: element.password,
    },
  };
};
