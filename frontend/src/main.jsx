import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";

import ScreenSearch from "./screens/ScreenSearch.jsx";

import ScreenActivities from "./screens/ScreenActivities.jsx";
import ActivityManage from "./components/activities/ActivityManage.jsx";
import ActivityView from "./components/activities/ActivityView.jsx";

import ScreenUpdates from "./screens/ScreenUpdates.jsx";
import SettingsAccount from "./components/settings/SettingsAccount.jsx";
import SettingsProfile from "./components/settings/SettingsProfile.jsx";

import ScreenLogout from "./screens/ScreenLogout.jsx";

import RouteOrganisation from "./components/routes/RouteOrganisation.jsx";
import RoutePrivate from "./components/routes/RoutePrivate.jsx";

import MemberView from "./components/members/MemberView.jsx";
import ScreenMessages from "./screens/ScreenMessages.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='' element={<Navigate to='search' replace={true} />} />
        <Route path='me' element={<SettingsProfile />} />
        <Route path='location' element={<>Location Change</>} />
        <Route path='account' element={<SettingsAccount />} />

        <Route path='activity/:id' element={<ActivityView />} />
        <Route path='organisation/:id' element={<MemberView />} />
        <Route path='member/:id' element={<MemberView />} />

        <Route path='messages' element={<ScreenMessages />}>
          <Route path=':id' element={<>Messages ID</>} />
        </Route>

        <Route path='search' element={<ScreenSearch />}>
          <Route path='activity/:id' element={<ActivityView />} />
          <Route path='organisation/:id' element={<MemberView />} />
          <Route path='member/:id' element={<MemberView />} />
        </Route>

        <Route path='updates' element={<ScreenUpdates />}>
          <Route path=':id' element={<h1>Update ID</h1>} />
        </Route>

        <Route path='' element={<RouteOrganisation />}>
          <Route path='activities' element={<ScreenActivities />}>
            <Route path='new' element={<ActivityManage />} />
            <Route path=':id' element={<ActivityManage />} />
          </Route>
        </Route>
      </Route>

      <Route path='logout' element={<ScreenLogout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
