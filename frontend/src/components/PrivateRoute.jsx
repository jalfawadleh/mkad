import { useContext } from "react";

import { Outlet } from "react-router-dom";

import { UserContext } from "../UserContext";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  return user.token && <Outlet />;
};
export default PrivateRoute;
