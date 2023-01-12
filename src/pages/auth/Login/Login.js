import classes from "./Login.module.css";

import { useEffect, useRef, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { message } from "antd";
import { URL_SERVER } from "../../../constants";
import {
  dispatchUserLogin,
  dispatchLogin,
} from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

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

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={`${classes["btn"]} ${classes[className]}`} {...rest}>
      {children}
    </button>
  );
};

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = ({ className }) => {
  const [user, setUser] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();
  const showPassRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let pwd = document.getElementById("password");
    let eye = document.getElementById("visibility");
    const showPasswordCopyRef = showPassRef.current;

    const showPasswordHandler = () => {
      eye.classList.toggle("active");

      pwd.type === "password" ? (pwd.type = "text") : (pwd.type = "password");
    };

    if (showPasswordCopyRef) {
      showPasswordCopyRef.addEventListener("click", showPasswordHandler);
    }

    return () => {
      if (showPasswordCopyRef) {
        showPasswordCopyRef.removeEventListener("click", showPasswordHandler);
      }
      showPassRef.current = showPasswordCopyRef;
    };
  });

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "985453790796-3blkrf1glddf1gudrbg8cog8earsegn8.apps.googleusercontent.com",
        scope: "profile",
      });
    };
    gapi.load("client:auth2", initClient);
  });

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${URL_SERVER}/user/login`, {
        email: user.email,
        password: user.password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      dispatch(
        dispatchUserLogin({ email: user.email, password: user.password })
      );
      navigate("/");
    } catch (err) {
      if (err.response.data.msg) {
        setUser({ ...user, err: err.response.data.msg, success: "" });
      } else {
        console.log(err);
      }
    }
  };

  const responseGoogle = async (response) => {
    console.log("responseGoogle", response);
    try {
      const res = await axios.post(`${URL_SERVER}/user/googlelogin`, {
        tokenId: response.tokenId,
      });
      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      dispatch(dispatchUserLogin({ email: res.data.user, password: "" }));
      navigate("/");
    } catch (err) {
      console.log("connect google fail: ", err);
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      console.log(response);
      const res = await axios.post(`${URL_SERVER}/user/facebooklogin`, {
        accessToken,
        userID,
      });

      localStorage.clear();
      localStorage.setItem("user", res.data.user);
    } catch (err) {
      err.response.data.msg && console.log("connect facebook fail: ", err);
    }
  };

  return (
    <div className={`${classes["form-login"]} ${className}`}>
      <form className={classes["form-container"]} onSubmit={onSubmitHandler}>
        <h3>LOGIN</h3>
        <h5>Sign in your account</h5>
        {contextHolder}
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value, err: "", success: "" })
          }
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value, err: "", success: "" })
          }
        />
        <VisibilityOutlinedIcon
          id="visibility"
          className={classes["visibility-password"]}
          ref={showPassRef}
        />

        <Link to="not-found" className={classes["forgetpass"]}>
          Forget Password?
        </Link>
        <Button className="btn-form" type="submit" onClick={onSubmitHandler}>
          Sign in
        </Button>
        <Link to="/register" className={classes["create"]}>
          Don't have an account? Sign up
        </Link>
        <div className={classes["social-media"]}>
          <h4 className={classes["social-media-title"]}>Login with </h4>
          <GoogleLogin
            clientId="985453790796-3blkrf1glddf1gudrbg8cog8earsegn8.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className={classes["social-btn"]}
              >
                <GoogleIcon />
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="588324053115993"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className={classes["social-btn"]}
              >
                <FacebookIcon />
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
