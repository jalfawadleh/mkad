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
import MembersScreen from "./screens/MembersScreen.jsx";
import ActivitiesScreen from "./screens/ActivitiesScreen.jsx";
import MessagesScreen from "./screens/MessagesScreen.jsx";
import UpdatesScreen from "./screens/UpdatesScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import ActivitiesNew from "./components/activities/ActivitiesNew.jsx";
import ActivitiesDelete from "./components/activities/ActivitiesDelete.jsx";
import ActivitiesView from "./components/activities/ActivitiesView.jsx";
import ActivitiesEdit from "./components/activities/ActivitiesEdit.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/search' element={<SearchScreen />}>
        <Route
          path='/search/activity/:id'
          element={<h1>Search Activity View</h1>}
        />
        <Route
          path='/search/organisation/:id'
          element={<h1>Search Organisation View</h1>}
        />
        <Route
          path='/search/member/:id'
          element={<h1>search Member View</h1>}
        />
      </Route>
      <Route path='/members' element={<MembersScreen />}>
        <Route path='/members/view/:id' element={<h1>Member ID</h1>} />
      </Route>
      <Route path='/activities' element={<ActivitiesScreen />}>
        <Route path='/activities/new' element={<ActivitiesNew />} />
        <Route path='/activities/view/:id' element={<ActivitiesView />} />
        <Route path='/activities/edit/:id' element={<ActivitiesEdit />} />
        <Route path='/activities/delete/:id' element={<ActivitiesDelete />} />
      </Route>
      <Route path='/organisations' element={<h1>Organisation</h1>}>
        <Route
          path='/organisations/join/:id'
          element={<h1>Organisation Join</h1>}
        />
        <Route
          path='/organisations/leave/:id'
          element={<h1>Organisation Leave</h1>}
        />
      </Route>
      <Route path='/updates' element={<UpdatesScreen />}>
        <Route path='/updates/:id' element={<h1>Update ID</h1>} />
      </Route>
      <Route path='/messages' element={<MessagesScreen />}>
        <Route path='/messages/:id' element={<h1>Messages ID</h1>} />
      </Route>
      <Route path='/settings' element={<SettingsScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
