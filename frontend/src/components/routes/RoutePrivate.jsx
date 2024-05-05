import { useContext } from "react";

import { Outlet } from "react-router-dom";

import { UserContext } from "../../store";
import Map from "../common/Map";
import ScreenLogin from "../../screens/ScreenLogin";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  return user.token ? (
    <Map>
      <Outlet />
    </Map>
  ) : (
    <ScreenLogin />
  );
};
export default PrivateRoute;
