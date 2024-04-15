import { UserContext } from "../../store.js";
import { useContext } from "react";
import {
  AvatarCustomLink,
  HelpCircleLink,
  LocationCircleLink,
  MKaDifferenceCircleLink,
  SearchCircleLink,
} from "./Icons.jsx";

const Header = () => {
  const { user } = useContext(UserContext);

  const headerLinks = (
    <>
      <LocationCircleLink location={user.location} />
      <HelpCircleLink />
      <AvatarCustomLink name={user.name} />
      <SearchCircleLink />
      <MKaDifferenceCircleLink />
    </>
  );

  return (
    <>
      <nav
        style={{ top: "75px", margin: "6px", borderRadius: "25px" }}
        className='d-none d-sm-block position-absolute end-0 p-0 bg-black  navbar navbar-expand'
      >
        <div className='d-flex flex-column navbar-nav'>{headerLinks}</div>
      </nav>

      <nav className='w-100 position-absolute bottom-0 none d-sm-none navbar navbar-expand m-0 p-0'>
        <div className='w-100 p-0 m-0 justify-content-around navbar-nav'>
          {headerLinks}
        </div>
      </nav>
    </>
  );
};

export default Header;
