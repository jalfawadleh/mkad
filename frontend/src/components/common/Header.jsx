import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
// import { FaWindowClose } from "react-icons/fa";

import { UserContext } from "../../store.js";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  const headerLinks = (
    <>
      <LinkContainer to='me'>
        <span role='button' className='p-0 m-1 bg-black rounded-pill'>
          <img
            height='44px'
            width='44px'
            src={"https://api.multiavatar.com/" + user.name + ".png"}
            alt='Profile Photo'
          />
        </span>
      </LinkContainer>

      <LinkContainer to='help'>
        <span role='button' className='p-2 m-1 bg-black rounded-pill'>
          <FaQuestion size={28} />
        </span>
      </LinkContainer>

      {user.type === "organisation" && (
        <LinkContainer to='activities'>
          <span role='button' className='p-2 m-1 bg-black rounded-pill'>
            <FaFlag size={28} />
          </span>
        </LinkContainer>
      )}
      <LinkContainer to='updates'>
        <span role='button' className='p-2 m-1 bg-black rounded-pill'>
          <FaBell size={28} />
        </span>
      </LinkContainer>
      <LinkContainer to='messages'>
        <span role='button' className='p-2 m-1 bg-black rounded-pill'>
          <FaEnvelope size={28} />
        </span>
      </LinkContainer>
      <LinkContainer to='/'>
        <span role='button' className='p-2 m-1 bg-black rounded-pill'>
          <FaSearch size={28} />
        </span>
      </LinkContainer>
    </>
  );

  return (
    <>
      <Navbar
        className='d-none d-sm-block position-absolute end-0 translate-middle-y p-0 m-0 '
        style={{ top: "250px" }}
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
