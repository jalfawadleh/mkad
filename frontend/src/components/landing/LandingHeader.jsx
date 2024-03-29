import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const LandingHeader = () => {
  return (
    <>
      <Navbar collapseOnSelect fixed='top' expand='sm' className='bg-black'>
        <Container className='bg-black border-bottom'>
          <Navbar.Brand href='#'>
            <h4>
              <img
                src='/logo.png'
                alt='δ'
                className='img-thumbnail border-0'
                height={30}
                width={30}
                style={{ marginTop: "-6px" }}
              />
              MKaδifference
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-end'
          >
            <Nav>
              <Nav.Link href='#login'>Login or Join</Nav.Link>
              <Nav.Link href='#about'>Who We Are</Nav.Link>
              <Nav.Link href='#faq'>Why Join Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default LandingHeader;
