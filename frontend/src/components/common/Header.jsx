import { UserContext } from "../../store.js";
import { useContext } from "react";
import {
  Empty,
  HelpCircleLink,
  HomeCircleLink,
  LocationCircleLink,
  MKaDifferenceCircleLink,
  SearchCircleLink,
} from "./Icons.jsx";

const Header = () => {
  const { user } = useContext(UserContext);

  const icons = (
    <>
      <MKaDifferenceCircleLink to='/MkAdifference' />
      <HelpCircleLink />
      <SearchCircleLink />
      <HomeCircleLink to='/' />
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

      <nav className='w-100 position-absolute bottom-0 d-sm-none navbar navbar-expand m-0 p-0'>
        <div className='w-100 p-0 m-0 justify-content-around navbar-nav'>
          {icons}
          <Empty />
        </div>
      </nav>
    </>
  );
};

export default Header;
