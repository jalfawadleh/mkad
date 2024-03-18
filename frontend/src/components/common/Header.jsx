import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
// import { FaWindowClose } from "react-icons/fa";
// import { IoLogOut } from "react-icons/io5";

import { UserContext } from "../../store.js";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  const headerLinks = (
    <Nav
      bg='dark'
      variant='dark'
      className='p-0 m-0 w-100 justify-content-around'
    >
      <LinkContainer to='search'>
        <Nav.Link>
          <FaSearch size={20} />
        </Nav.Link>
      </LinkContainer>

      {user.type === "organisation" && (
        <LinkContainer to='activities'>
          <Nav.Link>
            <FaFlag size={20} />
          </Nav.Link>
        </LinkContainer>
      )}
      <LinkContainer to='updates'>
        <Nav.Link>
          <FaBell size={20} />
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='messages'>
        <Nav.Link>
          <FaEnvelope size={20} />
        </Nav.Link>
      </LinkContainer>

      <LinkContainer to='/me'>
        <Nav.Link>
          <img
            height='25px'
            width='25px'
            src={"https://api.multiavatar.com/" + user.name + ".png"}
            alt='Profile Photo'
          />
        </Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <>
      <Navbar
        bg='dark'
        variant='dark'
        className='m-1 mb-2 p-0 d-none d-sm-block'
        style={{ borderRadius: 10, width: "300px" }}
      >
        {headerLinks}
      </Navbar>

      <Navbar
        bg='dark'
        variant='dark'
        className='w-100 position-absolute bottom-0 none d-sm-none'
      >
        {headerLinks}
      </Navbar>
    </>
  );
};

export default Header;
