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

import MemberUpdates from "./components/dashboard/MemberUpdates.jsx";
import MemberContacts from "./components/dashboard/MemberContacts.jsx";
import MemberActivities from "./components/dashboard/MemberActivities.jsx";
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

import Messaging from "./components/Messaging.jsx";
import Discussion from "./components/Discussion.jsx";

import ScreenMKaDifference from "./screens/ScreenMKaDifference.jsx";
import WhoWeAre from "./components/mkadifference/WhoWeAre.jsx";
import ContactUs from "./components/mkadifference/ContactUs.jsx";
import HowTo from "./components/mkadifference/HowTo.jsx";

import ScreenSearch from "./screens/ScreenSearch.jsx";
import Share from "./components/Share.jsx";
import ManageMembers from "./components/manage/ManageMembers.jsx";
import Error from "./components/Error.jsx";
import MemberInvites from "./components/dashboard/MemberInvites.jsx";
import PasswordLink from "./components/PasswordLink.jsx";
import Invite from "./components/Invite.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<Error />} element={<App />}>
      <Route path='' element={<RoutePrivate />}>
        <Route path='' element={<ScreenDashboard />}>
          <Route path='updates' element={<MemberUpdates />} />
          <Route path='invites' element={<MemberInvites />} />
          <Route path='invites/passwordlink/:id' element={<PasswordLink />} />
          <Route path='invites/invite' element={<Invite />} />

          <Route path='profile' element={<Profile />} />
          <Route path='account' element={<Account />} />

          <Route path='members' element={<MemberContacts />} />
          <Route path='members/:id' element={<Member />} />

          <Route path='activities' element={<MemberActivities />} />
          <Route path='activities/:id' element={<Activity />} />

          <Route path='organisations' element={<MemberOrganisations />} />
          <Route path='organisations/:id' element={<Organisation />} />

          <Route path='messaging/:id/:name' element={<Messaging />} />
          <Route path='discussion/:type/:id/:name' element={<Discussion />} />

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

        <Route path='mkadifference' element={<ScreenMKaDifference />}>
          <Route path='whoweare' element={<WhoWeAre />} />
          <Route path='contactus' element={<ContactUs />} />
          <Route path='howto' element={<HowTo />} />
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
