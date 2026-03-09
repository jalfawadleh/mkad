import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datetime/css/react-datetime.css";
import "leaflet/dist/leaflet.css";

import { UserContext } from "./store.js";
import io from "socket.io-client";
import { getErrorMessage } from "./utils/http.js";
import { getApiBaseUrl } from "./utils/apiConfig.js";

const App = () => {
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState({});

  const API_BASE = getApiBaseUrl(import.meta.env.PROD);
  const URL = API_BASE.replace(/api\/$/, "");

  useEffect(() => {
    axios.defaults.baseURL = API_BASE;
    if (user.token) axios.defaults.headers.common.Authorization = user.token;
    else delete axios.defaults.headers.common.Authorization;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  }, [API_BASE, user.token]);

  const getUpdates = useCallback(async () => {
    await axios
      .get("/updates")
      .then((res) =>
        setUser((prev) => ({
          ...prev,
          updates: res.data.length ? true : false,
        }))
      )
      .catch((error) => toast.error(getErrorMessage(error)));
  }, []);

  useEffect(() => {
    if (!user.token) {
      setSocket({});
      return;
    }

    const nextSocket = io(URL, {
      autoConnect: true,
      auth: { token: user.token },
      secure: true,
      transports: ["websocket"],
    });
    setSocket(nextSocket);
    getUpdates();

    const intervalId = setInterval(() => {
      getUpdates();
    }, 30000);

    return () => {
      clearInterval(intervalId);
      nextSocket.disconnect();
      setSocket({});
    };
  }, [URL, getUpdates, user.token]);

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
