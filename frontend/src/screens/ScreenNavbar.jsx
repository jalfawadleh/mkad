import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

import { UserContext } from "../store.js";
import { useContext } from "react";

const ScreenNavbar = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar
        bg='dark'
        className='d-none d-sm-block m-1 p-0'
        variant='dark'
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
          borderRadius: 10,
        }}
      >
        <Nav bg='dark' variant='dark' className='p-0 m-0 flex-column'>
          <Nav.Link href='/'>
            <FaWindowClose />
          </Nav.Link>
          <LinkContainer to='/settings'>
            <Nav.Link>
              <FaCog />
            </Nav.Link>
          </LinkContainer>

          {user.type === "organisation" && (
            <LinkContainer to='/activities'>
              <Nav.Link>
                <FaFlag />
              </Nav.Link>
            </LinkContainer>
          )}
          <LinkContainer to='/updates'>
            <Nav.Link>
              <FaBell />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/members'>
            <Nav.Link>
              <FaEnvelope />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/search'>
            <Nav.Link>
              <FaSearch />
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <Navbar bg='dark' className='p-0 m-0 d-block d-sm-none ' variant='dark'>
          <Nav justify bg='dark' variant='dark' className='p-0 m-0'>
            <LinkContainer to='/settings'>
              <Nav.Link>
                <FaCog />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/activities'>
              <Nav.Link>
                <FaFlag />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/updates'>
              <Nav.Link>
                <FaBell />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/messages'>
              <Nav.Link>
                <FaEnvelope />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
              <Nav.Link>
                <FaSearch />
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default ScreenNavbar;
