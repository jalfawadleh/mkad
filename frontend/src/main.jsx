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

import SearchScreen from "./screens/SearchScreen.jsx";
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
import ActivitiesRoute from "./components/activities/ActivitiesRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ScreenLogout from "./screens/ScreenLogout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/view' element={<>View</>}>
          <Route path='/view/activities/:id' element={<ActivitiesView />} />
          <Route path='/view/organisation/:id' element={<h1>View Org Id</h1>} />
          <Route path='/view/member/:id' element={<h1>View Member Id</h1>} />
        </Route>

        <Route path='/search' element={<SearchScreen />}>
          <Route path='/search/activities/:id' element={<ActivitiesView />} />
          <Route path='/search/organisations/:id' element={<h1>Org View</h1>} />
          <Route path='/search/members/:id' element={<h1> Member View</h1>} />
        </Route>

        <Route path='/members' element={<ScreenMembers />}>
          <Route path='/members/view/:id' element={<h1>Member View ID</h1>} />
          <Route path='/members/add/:id' element={<h1>Member Add ID</h1>} />
          <Route
            path='/members/remove/:id'
            element={<h1>Member Remove ID</h1>}
          />
          <Route path='/members/block/:id' element={<h1>Member Block ID</h1>} />
          <Route
            path='/members/messages/:id'
            element={<h1>Member msg ID</h1>}
          />
        </Route>

        <Route path='/organisations' element={<h1>Orgs</h1>}>
          <Route path='/organisations/join/:id' element={<h1>Orgs Join</h1>} />
          <Route
            path='/organisations/leave/:id'
            element={<h1>Orgs Leave</h1>}
          />
        </Route>

        <Route path='/updates' element={<ScreenUpdates />}>
          <Route path='/updates/:id' element={<h1>Update ID</h1>} />
        </Route>

        <Route path='' element={<ActivitiesRoute />}>
          <Route path='/activities' element={<ScreenActivities />}>
            <Route path='/activities/new' element={<ActivitiesNew />} />
            <Route path='/activities/view/:id' element={<ActivitiesView />} />
            <Route path='/activities/edit/:id' element={<ActivitiesEdit />} />
            <Route
              path='/activities/edit/location/:id'
              element={<>Edit Location</>}
            />
            <Route
              path='/activities/delete/:id'
              element={<ActivitiesDelete />}
            />
          </Route>
        </Route>

        <Route path='/settings' element={<ScreenSettings />}>
          <Route path='/settings/profile' element={<SettingsProfile />} />
          <Route path='/settings/location' element={<>Location Change</>} />
          <Route path='/settings/account' element={<SettingsAccount />} />
          <Route path='/settings/delete' element={<SettingsDelete />} />
        </Route>
      </Route>
      <Route path='/logout' element={<ScreenLogout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
