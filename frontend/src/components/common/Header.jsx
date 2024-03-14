import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

import { UserContext } from "../../store.js";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  const headerLinks = (
    <Nav
      bg='dark'
      variant='dark'
      className='p-0 m-0 w-100 justify-content-between'
    >
      <Nav.Link href='/'>
        <FaWindowClose />
      </Nav.Link>
      <LinkContainer to='settings'>
        <Nav.Link>
          <FaCog />
        </Nav.Link>
      </LinkContainer>
      {user.type === "organisation" && (
        <LinkContainer to='activities'>
          <Nav.Link>
            <FaFlag />
          </Nav.Link>
        </LinkContainer>
      )}
      <LinkContainer to='updates'>
        <Nav.Link>
          <FaBell />
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='messages'>
        <Nav.Link>
          <FaEnvelope />
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='search'>
        <Nav.Link>
          <FaSearch />
        </Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <>
      <Navbar
        bg='dark'
        className='d-none d-sm-block m-1 p-1'
        variant='dark'
        style={{ borderRadius: 10, maxWidth: "300px" }}
      >
        {headerLinks}
      </Navbar>
      <div
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <Navbar bg='dark' className='d.block d-sm-none p-0 m-0' variant='dark'>
          {headerLinks}
        </Navbar>
      </div>
    </>
  );
};

export default Header;
