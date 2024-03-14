import { useContext } from "react";

import { Outlet } from "react-router-dom";

import { UserContext } from "../../store";
import Map from "../BackgroundMap/Map";
import ScreenLanding from "../../screens/ScreenLanding";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  return user.token ? (
    <Map>
      <Outlet />
    </Map>
  ) : (
    <ScreenLanding />
  );
};
export default PrivateRoute;
