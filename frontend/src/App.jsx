import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datetime/css/react-datetime.css";
import "leaflet/dist/leaflet.css";

import { UserContext } from "./store.js";

const App = () => {
  const [user, setUser] = useState([]);

  axios.defaults.baseURL = import.meta.env.PROD
    ? "https://demo.mkadifference.com/api/"
    : "http://localhost:3011/api/";
  axios.defaults.headers.common.Authorization = user.token;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
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
