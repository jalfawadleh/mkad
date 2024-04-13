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

import RoutePrivate from "./components/routes/RoutePrivate.jsx";

import ScreenSearch from "./screens/ScreenSearch.jsx";
import ScreenDashboard from "./screens/ScreenDashboard.jsx";
import ScreenUpdates from "./screens/ScreenUpdates.jsx";
import ScreenMessages from "./screens/ScreenMessages.jsx";
import ScreenLogout from "./screens/ScreenLogout.jsx";

import ManageActivity from "./components/dashboard/ManageActivity.jsx";
import ManageAccount from "./components/dashboard/ManageAccount.jsx";
import ManageMember from "./components/dashboard/ManageMember.jsx";

import Activity from "./components/Activity.jsx";
import Organisation from "./components/Organization.jsx";
import Member from "./components/Member.jsx";
import Help from "./components/Help.jsx";
import Discussion from "./components/Discussion.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='help' element={<Help />} />
        <Route path='activity/:id' element={<Activity />} />
        <Route path='organisation/:id' element={<Organisation />} />
        <Route path='member/:id' element={<Member />} />

        <Route path='dashboard' element={<ScreenDashboard />}>
          <Route path='activity/:id' element={<Activity />} />
          <Route path='organisation/:id' element={<Organisation />} />
          <Route path='manage/member' element={<ManageMember />} />
          <Route path='manage/account' element={<ManageAccount />} />
          <Route path='manage/activity/:id' element={<ManageActivity />} />
          <Route path='manage/activity/new' element={<ManageActivity />} />
        </Route>

        <Route path='discussion/:type/:id/:name' element={<Discussion />} />

        <Route path='updates' element={<ScreenUpdates />}>
          <Route path=':id' element={<h1>Update ID</h1>} />
        </Route>

        <Route path='' element={<ScreenSearch />}>
          <Route path='activity/:id' element={<Activity />} />
          <Route path='organisation/:id' element={<Organisation />} />
          <Route path='member/:id' element={<Member />} />
        </Route>
      </Route>

      <Route path='logout' element={<ScreenLogout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
