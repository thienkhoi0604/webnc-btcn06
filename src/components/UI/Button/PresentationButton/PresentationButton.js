// import classes from "./PresentationButton.module.css";
import { Button } from "antd";

const PresentationButton = (props) => {
  const { icon, current, children } = props;
  if (current) {
    return (
      <Button
        style={{
          width: "120px",
          height: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#196cff",
          color: "white",
        }}
      >
        {icon}
        {children}
      </Button>
    );
  }
  return (
    <Button
      style={{
        width: "120px",
        height: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {icon}
      {children}
    </Button>
  );
};

export default PresentationButton;
