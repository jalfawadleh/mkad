import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { UserContext } from "../../store.js";
import { useContext } from "react";

import {
  AvatarMember,
  IconActivity,
  IconFlyTo,
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
      <IconFlyTo location={user.location} />

      <span role='button' className='p-0 m-0'>
        <Link to='profile'>
          <AvatarMember name={user.name} />
        </Link>
      </span>

      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <Link to='help'>
          <IconHelp />
        </Link>
      </span>

      {user.type === "organisation" && (
        <span
          role='button'
          className='p-1 m-1 bg-black rounded-pill border border-primary'
        >
          <Link to='activities'>
            <IconActivity />
          </Link>
        </span>
      )}

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
    </>
  );

  return (
    <>
      <Navbar
        className='d-none d-sm-block position-absolute end-0 p-0 bg-black '
        style={{ top: "75px", margin: "6px", borderRadius: 25 }}
      >
        <Nav className='d-flex flex-column'>{headerLinks}</Nav>
      </Navbar>

      <Navbar className='w-100 position-absolute bottom-0 none d-sm-none'>
        <Nav className='w-100 p-0 m-0 justify-content-around'>
          {headerLinks}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
