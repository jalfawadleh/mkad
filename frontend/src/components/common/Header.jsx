import { LinkContainer } from "react-router-bootstrap";
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

const Header = () => {
  const { user } = useContext(UserContext);
  const headerLinks = (
    <>
      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <IconFlyTo location={user.location} />
      </span>

      <LinkContainer to='me'>
        <span role='button' className='p-0 m-0'>
          <AvatarMember name={user.name} />
        </span>
      </LinkContainer>

      <LinkContainer to='help'>
        <span
          role='button'
          className='p-1 m-1 bg-black rounded-pill border border-primary'
        >
          <IconHelp />
        </span>
      </LinkContainer>

      {user.type === "organisation" && (
        <LinkContainer to='activities'>
          <span
            role='button'
            className='p-1 m-1 bg-black rounded-pill border border-primary'
          >
            <IconActivity />
          </span>
        </LinkContainer>
      )}
      <LinkContainer to='updates'>
        <span
          role='button'
          className='p-1 m-1 bg-black rounded-pill border border-primary'
        >
          <IconUpdate />
        </span>
      </LinkContainer>
      <LinkContainer to='messages'>
        <span
          role='button'
          className='p-1 m-1 bg-black rounded-pill border border-primary'
        >
          <IconMessage />
        </span>
      </LinkContainer>
      <LinkContainer to='/'>
        <span
          role='button'
          className='p-1 m-1 bg-black rounded-pill border border-primary'
        >
          <IconSearch />
        </span>
      </LinkContainer>
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
