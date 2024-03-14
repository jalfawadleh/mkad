import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../store.js";
import { useContext } from "react";

const OrganisationRoute = () => {
  const { user } = useContext(UserContext);

  return user.type === "organisation" ? (
    <Outlet />
  ) : (
    <Navigate to='/' replace />
  );
};
export default OrganisationRoute;
