import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "leaflet/dist/leaflet.css";

import { UserContext } from "./store.js";

const App = () => {
  const [user, setUser] = useState([]);

  axios.defaults.baseURL = "http://127.0.0.1:3001/api/";
  axios.defaults.headers.common.Authorization = user.token;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
        <ToastContainer />
      </UserContext.Provider>
    </>
  );
};

export default App;
