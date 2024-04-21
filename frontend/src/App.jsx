import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datetime/css/react-datetime.css";
import "leaflet/dist/leaflet.css";

import { UserContext } from "./store.js";
import io from "socket.io-client";

const App = () => {
  const [user, setUser] = useState([]);
  const [socket, setSocket] = useState([]);

  const URL = import.meta.env.PROD
    ? "https://demo.mkadifference.com/"
    : "http://localhost:3011/";

  axios.defaults.baseURL = URL + "api/";
  axios.defaults.headers.common.Authorization = user.token;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  const ioParams = {
    autoConnect: true,
    auth: { token: user.token },
    secure: true,
  };

  useEffect(() => {
    if (user.token) setSocket(io(URL, ioParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  useEffect(() => {
    const onDisconnect = () => (window.location.href = "/");
    if (socket.id) socket.on("disconnect", onDisconnect);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.id]);

  // on socket disconnect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, socket }}>
        <Outlet />
        <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme='dark'
        />
      </UserContext.Provider>
    </>
  );
};

export default App;
