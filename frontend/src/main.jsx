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

import MemberActivities from "./components/dashboard/MemberActivities.jsx";
import MemberContacts from "./components/dashboard/MemberContacts.jsx";
import MemberOrganisations from "./components/dashboard/MemberOrganisations.jsx";

import Activity from "./components/Activity.jsx";
import Organisation from "./components/Organization.jsx";
import Member from "./components/Member.jsx";

import Profile from "./components/Profile.jsx";
import Account from "./components/Account.jsx";

import RouteOrganisation from "./components/routes/RouteOrganisation.jsx";

import ScreenManage from "./screens/ScreenManage.jsx";
import ManageActivity from "./components/manage/ManageActivity.jsx";
import ManageActivities from "./components/manage/ManageActivities.jsx";

import Conversation from "./components/Conversation.jsx";

import ScreenHelp from "./screens/ScreenHelp.jsx";
import HowTo from "./components/help/HowTo.jsx";

import ScreenMKaDifference from "./screens/ScreenMKaDifference.jsx";
import WhoWeAre from "./components/mkadifference/WhoWeAre.jsx";
import ContactUs from "./components/mkadifference/ContactUs.jsx";
import Updates from "./components/mkadifference/Updates.jsx";

import ScreenSearch from "./screens/ScreenSearch.jsx";
import Share from "./components/Share.jsx";
import ManageMembers from "./components/manage/ManageMembers.jsx";
import ScreenLanding from "./screens/ScreenLanding.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ScreenLanding />} element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='' element={<ScreenDashboard />}>
          <Route path='profile' element={<Profile />} />
          <Route path='account' element={<Account />} />

          <Route path='activities' element={<MemberActivities />} />
          <Route path='activities/:id' element={<Activity />} />

          <Route path='members' element={<MemberContacts />} />
          <Route path='members/:id' element={<Member />} />

          <Route path='organisations' element={<MemberOrganisations />} />
          <Route path='organisations/:id' element={<Organisation />} />

          <Route
            path='conversations/:type/:id/:name'
            element={<Conversation />}
          />
          <Route path='share/:type/:id' element={<Share />} />
        </Route>
        <Route path='' element={<RouteOrganisation />}>
          <Route path='manage' element={<ScreenManage />}>
            <Route path='activity/:id' element={<ManageActivity />} />
            <Route path='activity/new' element={<ManageActivity />} />
            <Route path='activities' element={<ManageActivities />} />
            <Route path='members' element={<ManageMembers />} />
          </Route>
        </Route>

        <Route path='help' element={<ScreenHelp />}>
          <Route path='howto' element={<HowTo />} />
        </Route>

        <Route path='mkadifference' element={<ScreenMKaDifference />}>
          <Route path='whoweare' element={<WhoWeAre />} />
          <Route path='contactus' element={<ContactUs />} />
          {/* <Route path='updates' element={<Updates />} /> */}
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
