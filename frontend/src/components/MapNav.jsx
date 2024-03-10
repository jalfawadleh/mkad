import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

const MapNav = () => {
  return (
    <>
      <Navbar
        bg='dark'
        className='float-sm-end float-md-end float-lg-end p-0 m-sm-1 m-md-1 m-lg-1 d-none d-sm-block'
        variant='dark'
        style={{ borderRadius: 10 }}
      >
        <Nav bg='dark' variant='dark' className='p-0 m-0'>
          <LinkContainer to='/'>
            <Nav.Link>Search</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/activities'>
            <Nav.Link>Activities</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/manage'>
            <Nav.Link>Manage</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/messages'>
            <Nav.Link>Messages</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/profile'>
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Navbar bg='dark' className='p-0 m-0 d-block d-sm-none ' variant='dark'>
          <Nav justify bg='dark' variant='dark' className='p-0 m-0'>
            <LinkContainer to='/'>
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/activities'>
              <Nav.Link>Activities</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/manage'>
              <Nav.Link>Manage</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/messages'>
              <Nav.Link>Messages</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/profile'>
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default MapNav;
