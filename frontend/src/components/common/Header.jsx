import { UserContext } from "../../store.js";
import { useContext } from "react";

import {
  AvatarMember,
  IconHelp,
  IconMessage,
  IconSearch,
  IconUpdate,
} from "./LinkItems";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(UserContext);
  const headerLinks = (
    <>
      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <Link to='help'>
          <IconHelp />
        </Link>
      </span>

      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <Link to='updates'>
          <IconUpdate />
        </Link>
      </span>

      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <Link to='messages'>
          <IconMessage />
        </Link>
      </span>

      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <Link to='/'>
          <IconSearch />
        </Link>
      </span>

      <span role='button' className='p-0 m-0'>
        <Link to='dashboard'>
          <AvatarMember name={user.name} />
        </Link>
      </span>
    </>
  );

  return (
    <>
      <nav
        style={{ top: "75px", margin: "6px", borderRadius: "25px" }}
        className='d-none d-sm-block position-absolute end-0 p-0 bg-black  navbar navbar-expand navbar-light'
      >
        <div className='d-flex flex-column navbar-nav'>{headerLinks}</div>
      </nav>

      <nav className='w-100 position-absolute bottom-0 none d-sm-none navbar navbar-expand navbar-light m-0 p-0'>
        <div className='w-100 p-0 m-0 justify-content-around navbar-nav'>
          {headerLinks}
        </div>
      </nav>
    </>
  );
};

export default Header;
