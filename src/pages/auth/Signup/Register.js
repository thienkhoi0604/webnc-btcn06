import classes from "./Register.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL_SERVER } from "../../../constants";
import { message } from "antd";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../../../components/utils/validation/Validation";

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={`${classes["btn"]} ${classes[className]}`} {...rest}>
      {children}
    </button>
  );
};

const Input = ({ ...rest }) => {
  return (
    <>
      <input
        className={`${classes["input-element"]} ${classes[rest.className]}`}
        type={rest.type || "text"}
        {...rest}
      />
    </>
  );
};

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
  fullname: "",
  telephone: "",
  err: "",
  success: "",
};

const Register = ({ getUser, onLogin }) => {
  const [user, setUser] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const notification = (type, value) => {
      messageApi.open({
        type: type,
        content: value,
      });
    };

    if (user.err !== "") {
      notification("error", user.err);
    }
    if (user.success !== "") {
      notification("success", user.success);
    }
  }, [user.err, user.success, messageApi]);

  const onSubmitRegistrationHandler = async (event) => {
    event.preventDefault();

    if (
      isEmpty(user.fullname) ||
      isEmpty(user.password) ||
      isEmpty(user.telephone)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(user.email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(user.password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(user.password, user.repeatPassword))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post(`${URL_SERVER}/user/register`, {
        email: user.email,
        password: user.password,
        fullname: user.fullname,
        telephone: user.telephone,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      if (err.response.data.msg) {
        setUser({ ...user, err: err.response.data.msg, success: "" });
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className={classes["form-signup"]}>
      <form
        className={classes["form-container"]}
        method="post"
        action={URL_SERVER}
      >
        <img src="./images/bg-heading-03.jpg" alt="Background sign up" />
        <div className={classes["form-input-signup"]}>
          <h3>SIGN UP</h3>
          <h5>Registration info</h5>
          <span className={classes["error"]} id="message"></span>
          {contextHolder}
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value, err: "", success: "" })
            }
          />
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
                err: "",
                success: "",
              })
            }
          />
          <Input
            id="repeat-password"
            type="password"
            name="repeat-password"
            placeholder="Repeat password"
            value={user.repeatPassword}
            onChange={(e) =>
              setUser({
                ...user,
                repeatPassword: e.target.value,
                err: "",
                success: "",
              })
            }
          />
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={user.fullname}
            onChange={(e) =>
              setUser({
                ...user,
                fullname: e.target.value,
                err: "",
                success: "",
              })
            }
          />
          <Input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={user.telephone}
            onChange={(e) =>
              setUser({
                ...user,
                telephone: e.target.value,
                err: "",
                success: "",
              })
            }
          />
          <Button
            className="btn-signup"
            type="submit"
            onClick={onSubmitRegistrationHandler}
          >
            Submit
          </Button>
          <Link to="/login" className={classes["back-login"]}>
            You have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
