import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
// import { FaWindowClose } from "react-icons/fa";
// import { IoLogOut } from "react-icons/io5";

import { UserContext } from "../../store.js";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  const headerLinks = (
    <>
      <LinkContainer to='help'>
        <span role='button' className='p-1 m-0'>
          <FaQuestionCircle size={30} />
        </span>
      </LinkContainer>
      <LinkContainer to='/me'>
        <span role='button' className='p-1'>
          <img
            height='30px'
            width='30px'
            src={"https://api.multiavatar.com/" + user.name + ".png"}
            alt='Profile Photo'
          />
        </span>
      </LinkContainer>

      {user.type === "organisation" && (
        <LinkContainer to='activities'>
          <Nav.Link className='rounded-circle'>
            <FaFlag size={24} />
          </Nav.Link>
        </LinkContainer>
      )}
      <LinkContainer to='updates'>
        <Nav.Link className='rounded-circle'>
          <FaBell size={24} />
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='messages'>
        <Nav.Link className='rounded-circle'>
          <FaEnvelope size={24} />
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='search'>
        <Nav.Link className='rounded-circle'>
          <FaSearch size={24} />
        </Nav.Link>
      </LinkContainer>
    </>
  );

  return (
    <>
      <Navbar
        bg='black'
        variant='dark'
        className='m-2 p-0 d-none d-sm-block position-absolute end-0 translate-middle-y'
        style={{
          top: "200px",
          borderRadius: 25,
        }}
      >
        <Nav className='p-0 m-0 d-flex flex-column'>{headerLinks}</Nav>
      </Navbar>

      <Navbar
        bg='dark'
        variant='dark'
        className='w-100 position-absolute bottom-0 none d-sm-none'
      >
        <Nav className='w-100 p-0 m-0 justify-content-around'>
          {headerLinks}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
