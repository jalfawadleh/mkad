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

import RouteOrganisation from "./components/routes/RouteOrganisation.jsx";
import RoutePrivate from "./components/routes/RoutePrivate.jsx";

import ScreenSearch from "./screens/ScreenSearch.jsx";
import ScreenActivities from "./screens/ScreenActivities.jsx";
import ScreenUpdates from "./screens/ScreenUpdates.jsx";
import ScreenMessages from "./screens/ScreenMessages.jsx";
import ScreenLogout from "./screens/ScreenLogout.jsx";

import ManageActivity from "./components/manage/ManageActivity.jsx";
import ManageAccount from "./components/manage/ManageAccount.jsx";
import ManageProfile from "./components/manage/ManageProfile.jsx";

import Activity from "./components/Activity.jsx";
import Organisation from "./components/Organization.jsx";
import Member from "./components/Member.jsx";
import Help from "./components/Help.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='' element={<ScreenSearch />}>
          <Route path='activity/:id' element={<Activity />} />
          <Route path='organisation/:id' element={<Organisation />} />
          <Route path='member/:id' element={<Member />} />
        </Route>

        <Route path='profile' element={<ManageProfile />} />
        <Route path='account' element={<ManageAccount />} />
        <Route path='help' element={<Help />} />

        <Route path='activity/:id' element={<Activity />} />
        <Route path='organisation/:id' element={<Member />} />
        <Route path='member/:id' element={<Member />} />

        <Route path='messages' element={<ScreenMessages />}>
          <Route path=':id' element={<>Messages ID</>} />
        </Route>

        <Route path='updates' element={<ScreenUpdates />}>
          <Route path=':id' element={<h1>Update ID</h1>} />
        </Route>

        <Route path='' element={<RouteOrganisation />}>
          <Route path='activities' element={<ScreenActivities />}>
            <Route path='new' element={<ManageActivity />} />
            <Route path='activity/:id' element={<ManageActivity />} />
          </Route>
        </Route>
      </Route>

      <Route path='logout' element={<ScreenLogout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
