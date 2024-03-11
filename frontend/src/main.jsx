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
import ActivitiesScreen from "./screens/ActivitiesScreen.jsx";
import MessagesScreen from "./screens/MessagesScreen.jsx";
import UpdatesScreen from "./screens/UpdatesScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<SearchScreen />} />
      <Route path='/activities' element={<ActivitiesScreen />}>
        <Route path='/activities/activity/:id' element={<h1>Activity ID</h1>} />
      </Route>
      <Route path='/updates' element={<UpdatesScreen />}>
        <Route path='/updates/update/:id' element={<h1>Update ID</h1>} />
      </Route>
      <Route path='/messages' element={<MessagesScreen />}>
        <Route path='/messages/message/:id' element={<h1>Messages ID</h1>} />
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
