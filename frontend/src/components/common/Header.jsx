import { UserContext } from "../../store.js";
import { useContext } from "react";
import {
  DarkmodeCircle,
  HomeCircleLink,
  LightmodeCircle,
  LocationCircleLink,
  MKaDifferenceCircleLink,
  OrganisationCircleLink,
  SearchCircleLink,
} from "./Icons.jsx";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const icons = (
    <>
      <span
        onClick={() =>
          setUser((prev) => ({ ...prev, darkmode: !user.darkmode }))
        }
      >
        {user.darkmode ? <LightmodeCircle /> : <DarkmodeCircle />}
      </span>

      <MKaDifferenceCircleLink to='/mkadifference' />
      {user.type == "organisation" && <OrganisationCircleLink to='manage' />}
      <HomeCircleLink to='/' />
      <SearchCircleLink />
      <LocationCircleLink location={user.location} />
    </>
  );

  return (
    <>
      <div
        className='d-none d-sm-block position-absolute top-0 end-0 m-2 p-0'
        style={{ height: 250 }}
      >
        <nav className='d-flex justify-content-between flex-column navbar-nav h-100'>
          {icons}
        </nav>
      </div>

      <nav className='m-0 p-1 w-100 position-absolute bottom-0 d-sm-none navbar navbar-expand'>
        <div className='w-100 p-0 m-0 justify-content-between navbar-nav'>
          {icons}
        </div>
      </nav>
    </>
  );
};

export default Header;
