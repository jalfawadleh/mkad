import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../store";

const RouteOrganisation = () => {
  const { user } = useContext(UserContext);

  return user.type === "organisation" ? <Outlet /> : <Navigate to='/' replace />;
};
export default RouteOrganisation;
