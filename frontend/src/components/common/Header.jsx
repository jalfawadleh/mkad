import { UserContext } from "../../store.js";
import { useContext } from "react";
import {
  AvatarCustomLink,
  Empty,
  HelpCircleLink,
  LocationCircleLink,
  MKaDifferenceCircleLink,
  SearchCircleLink,
} from "./Icons.jsx";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <nav
        style={{ top: "75px", margin: "6px", borderRadius: "25px" }}
        className='d-none d-sm-block position-absolute end-0 p-0 bg-black  navbar navbar-expand'
      >
        <div className='d-flex flex-column navbar-nav'>
          <LocationCircleLink location={user.location} />
          <HelpCircleLink />
          <MKaDifferenceCircleLink to='/MkAdifference' />
          <SearchCircleLink />
          <AvatarCustomLink name={user.name} to='/' />
        </div>
      </nav>

      <nav className='w-100 position-absolute bottom-0 d-sm-none navbar navbar-expand m-0 p-0'>
        <div className='w-100 p-0 m-0 justify-content-around navbar-nav'>
          <AvatarCustomLink name={user.name} to='/' />
          <SearchCircleLink />
          <MKaDifferenceCircleLink to='/MkAdifference' />
          <HelpCircleLink />
          <LocationCircleLink location={user.location} />
          <Empty />
        </div>
      </nav>
    </>
  );
};

export default Header;
