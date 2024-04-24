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

import ScreenDashboard from "./screens/ScreenDashboard.jsx";

import JoinedActivities from "./components/dashboard/JoinedActivities.jsx";
import Activity from "./components/Activity.jsx";

import JoinedOrganisations from "./components/dashboard/joinedOrganisations.jsx";
import Organisation from "./components/Organization.jsx";

import Member from "./components/Member.jsx";
import ManageMember from "./components/dashboard/ManageMember.jsx";
import ManageAccount from "./components/dashboard/ManageAccount.jsx";

import RouteOrganisation from "./components/routes/RouteOrganisation.jsx";
import ManageActivity from "./components/dashboard/ManageActivity.jsx";
import ManageActivities from "./components/dashboard/ManageActivities.jsx";

import Conversation from "./components/Conversation.jsx";

import ScreenHelp from "./screens/ScreenHelp.jsx";
import HowTo from "./components/help/HowTo.jsx";

import ScreenMKaDifference from "./screens/ScreenMKaDifference.jsx";
import WhoWeAre from "./components/mkadifference/WhoWeAre.jsx";
import ContactUs from "./components/mkadifference/ContactUs.jsx";
import Updates from "./components/mkadifference/Updates.jsx";

import ScreenSearch from "./screens/ScreenSearch.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='' element={<ScreenDashboard />}>
          <Route path='activities' element={<JoinedActivities />} />
          <Route path='activities/:id' element={<Activity />} />

          <Route path='organisations' element={<JoinedOrganisations />} />
          <Route path='organisations/:id' element={<Organisation />} />

          <Route path='members/:id' element={<Member />} />

          <Route
            path='conversations/:type/:id/:name'
            element={<Conversation />}
          />

          <Route path='manage/member' element={<ManageMember />} />
          <Route path='manage/account' element={<ManageAccount />} />
          <Route path='' element={<RouteOrganisation />}>
            <Route path='manage/activity/:id' element={<ManageActivity />} />
            <Route path='manage/activity/new' element={<ManageActivity />} />
            <Route path='manage/activities' element={<ManageActivities />} />
          </Route>
        </Route>

        <Route path='help' element={<ScreenHelp />}>
          <Route path='howto' element={<HowTo />} />
        </Route>

        <Route path='mkadifference' element={<ScreenMKaDifference />}>
          <Route path='whoweare' element={<WhoWeAre />} />
          <Route path='contactus' element={<ContactUs />} />
          <Route path='updates' element={<Updates />} />
        </Route>

        <Route path='search' element={<ScreenSearch />}>
          <Route path='activity/:id' element={<Activity />} />
          <Route path='organisation/:id' element={<Organisation />} />
          <Route path='member/:id' element={<Member />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
