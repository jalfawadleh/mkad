import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import SearchComponent from "./components/SearchComponent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<SearchComponent />} />
      <Route path='/activities' element={<h1>Activities</h1>}>
        <Route path='/activities/activity/:id' element={<h1>Activity ID</h1>} />
      </Route>
      <Route path='/manage' element={<h1>Manage</h1>} />
      <Route path='/messages' element={<h1>Hessages</h1>} />
      <Route path='/profile' element={<h1>Profile</h1>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
