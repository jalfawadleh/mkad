import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

// import { FaWindowClose } from "react-icons/fa";

import { MapContext, UserContext } from "../../store.js";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);
  const { setMapCenter } = useContext(MapContext);

  const headerLinks = (
    <>
      <span
        role='button'
        className='p-2 m-1 bg-black rounded-pill border border-light-subtle'
        onClick={() => setMapCenter(user.location)}
      >
        <FaLocationCrosshairs size={24} />
      </span>

      <LinkContainer to='me'>
        <span
          role='button'
          className='p-1 m-1 bg-black rounded-pill border border-light-subtle'
        >
          <img
            height='32px'
            width='32px'
            src={"https://api.multiavatar.com/" + user.name + ".png"}
            alt='Profile Photo'
          />
        </span>
      </LinkContainer>

      <LinkContainer to='help'>
        <span
          role='button'
          className='p-2 m-1 bg-black rounded-pill border border-light-subtle'
        >
          <FaQuestion size={24} />
        </span>
      </LinkContainer>

      {user.type === "organisation" && (
        <LinkContainer to='activities'>
          <span
            role='button'
            className='p-2 m-1 bg-black rounded-pill border border-light-subtle'
          >
            <FaFlag size={24} />
          </span>
        </LinkContainer>
      )}
      <LinkContainer to='updates'>
        <span
          role='button'
          className='p-2 m-1 bg-black rounded-pill border border-light-subtle'
        >
          <FaBell size={24} />
        </span>
      </LinkContainer>
      <LinkContainer to='messages'>
        <span
          role='button'
          className='p-2 m-1 bg-black rounded-pill border border-light-subtle'
        >
          <FaEnvelope size={24} />
        </span>
      </LinkContainer>
      <LinkContainer to='/'>
        <span
          role='button'
          className='p-2 m-1 bg-black rounded-pill border border-light-subtle'
        >
          <FaSearch size={24} />
        </span>
      </LinkContainer>
    </>
  );

  return (
    <>
      <Navbar
        className='d-none d-sm-block position-absolute end-0 p-0 '
        style={{ top: "80px", margin: "1px" }}
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
