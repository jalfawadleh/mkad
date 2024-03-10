import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

const MapNav = () => {
  return (
    <div className='p-0 m-0 float-xs-start float-sm-start float-md-end float-lg-end'>
      <Navbar bg='dark' className='p-0 m-1' variant='dark'>
        <Nav bg='dark' variant='dark'>
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
  );
};

export default MapNav;
