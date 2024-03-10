import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed='top'
        expand='sm'
        className='bg-body-tertiary'
      >
        <Container>
          <Navbar.Brand href='#'>MKaDifference</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-end'
          >
            <Nav>
              <Nav.Link href='#login'>Login</Nav.Link>
              <Nav.Link href='#about'>Who We Are</Nav.Link>
              <Nav.Link href='#faq'>FAQ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
