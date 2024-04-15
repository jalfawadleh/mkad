import { useContext } from "react";

import { Outlet } from "react-router-dom";

import { UserContext } from "../../store";

const RouteOrganisation = () => {
  const { user } = useContext(UserContext);

  return user.type == "organisation" && <Outlet />;
};
export default RouteOrganisation;
