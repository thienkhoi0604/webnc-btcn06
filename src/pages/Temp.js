import { useEffect } from "react";
import { io } from "socket.io-client";
// import { URL_SERVER } from "../constants";

const socket = io("localhost:5000", {
  transports: ["websocket", "polling", "flashsocket"],
});

const Temp = () => {
  useEffect(() => {
    var form = document.getElementById("form");
    var input = document.getElementById("input");
    var messages = document.getElementById("messages");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
      }
    });

    socket.on("chat message", function (msg) {
      var item = document.createElement("li");
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socket.off("chat message");
      form.removeEventListener("submit");
    };
  }, []);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("a user connected");
    });
    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });

    return () => {
      socket.off("connection");
      socket.off("disconnect");
    };
  }, []);
  return (
    <>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </>
  );
};

export default Temp;
