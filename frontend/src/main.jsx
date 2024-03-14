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

import ScreenSearch from "./screens/ScreenSearch.jsx";
import ScreenMembers from "./screens/ScreenMembers.jsx";

import ScreenActivities from "./screens/ScreenActivities.jsx";
import ActivitiesNew from "./components/activities/ActivitiesNew.jsx";
import ActivitiesDelete from "./components/activities/ActivitiesDelete.jsx";
import ActivitiesView from "./components/activities/ActivitiesView.jsx";
import ActivitiesEdit from "./components/activities/ActivitiesEdit.jsx";

import ScreenUpdates from "./screens/ScreenUpdates.jsx";
import ScreenSettings from "./screens/ScreenSettings.jsx";
import SettingsAccount from "./components/settings/SettingsAccount.jsx";
import SettingsProfile from "./components/settings/SettingsProfile.jsx";
import SettingsDelete from "./components/settings/SettingsDelete.jsx";

import ScreenLogout from "./screens/ScreenLogout.jsx";

import RouteOrganisation from "./components/routes/RouteOrganisation.jsx";
import RoutePrivate from "./components/routes/RoutePrivate.jsx";

import MemberView from "./components/members/MemberView.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='activity/:id' element={<ActivitiesView />} />
        <Route path='activity/:id/join' element={<>Activity Join ID</>} />
        <Route path='activity/:id/leave' element={<>Activity leave ID</>} />

        <Route path='organisation:id' element={<h1>View Org Id</h1>} />
        <Route path='organisation:id/join' element={<h1>Orgs Join</h1>} />
        <Route path='organisation:id/leave' element={<h1>Orgs Leave</h1>} />

        <Route path='member/:id' element={<MemberView />} />

        <Route path='member' element={<ScreenMembers />}>
          <Route path='member/:id/add' element={<h1>Member Add ID</h1>} />
          <Route path=':id/delete' element={<h1>Member Remove ID</h1>} />
          <Route path=':id/block' element={<h1>Member Block ID</h1>} />
          <Route path=':id/messages' element={<h1>Member msg ID</h1>} />
        </Route>

        <Route path='messages' element={<>Messages</>} />

        <Route path='search' element={<ScreenSearch />}>
          <Route path='activity/:id' element={<ActivitiesView />} />
          <Route path='organisation/:id' element={<MemberView />} />
          <Route path='member/:id' element={<MemberView />} />
        </Route>

        <Route path='updates' element={<ScreenUpdates />}>
          <Route path=':id' element={<h1>Update ID</h1>} />
        </Route>

        <Route path='' element={<RouteOrganisation />}>
          <Route path='activities' element={<ScreenActivities />}>
            <Route path='new' element={<ActivitiesNew />} />
            <Route path=':id' element={<ActivitiesView />} />
            <Route path=':id/edit' element={<ActivitiesEdit />} />
            <Route path=':id/edit/location' element={<>Edit Location</>} />
            <Route path=':id/delete' element={<ActivitiesDelete />} />
          </Route>
        </Route>

        <Route path='settings' element={<ScreenSettings />}>
          <Route path='editprofile' element={<SettingsProfile />} />
          <Route path='editlocation' element={<>Location Change</>} />
          <Route path='editaccount' element={<SettingsAccount />} />
          <Route path='deleteaccount' element={<SettingsDelete />} />
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
