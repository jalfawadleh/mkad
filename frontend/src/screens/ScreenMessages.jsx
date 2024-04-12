import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

import { UserContext } from "../store";

import {
  Button,
  CenterText,
  CircleFold,
  CircleMessage,
  Empty,
} from "../components/common/Icons";
import { Bar } from "../components/common/Wrappers";

const ScreenMessages = () => {
  const { user } = useContext(UserContext);

  const [connected, setConnected] = useState(false);

  const URL = "http://localhost:3001"; // process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";
  const socket = io(URL, {
    autoConnect: false,
    extraHeaders: {
      authorization: user.token,
    },
  });

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      setConnected(socket.connected); // true
    });

    socket.on("disconnect", () => {
      setConnected(socket.connected); // false
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const topBar = (
    <Bar>
      <CircleMessage color={connected ? "white" : "gray"} />
      <CenterText>Communicate</CenterText>
      <Empty />
    </Bar>
  );

  return (
    <>
      {topBar}
      <Bar>
        <CenterText> {connected ? "Connected" : "Diconnected"}</CenterText>
        <span onClick={() => socket.emit("chat message", "Hello")}>
          <CircleMessage color={socket.connected ? "white" : "gray"} />
        </span>
      </Bar>

      <Outlet />
    </>
  );
};

export default ScreenMessages;
