import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";

import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/esm/Navbar";

const SearchComponent = () => {
  const { innerHeight } = window;
  return (
    <>
      <Navbar
        bg='dark'
        className='float-sm-start float-md-start float-lg-start p-1 m-1'
        variant='dark'
        style={{ borderRadius: 10 }}
      >
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search'
            aria-label='Search'
            size='sm'
          />
          <Button variant='outline-success' size='sm'>
            Search
          </Button>
        </Form>
      </Navbar>
      <Container fluid className='p-0 m-0'>
        <Container
          fluid
          className='p-1 m-0'
          style={{
            maxHeight: innerHeight - 100,
            maxWidth: 400,
            overflow: "scroll",
          }}
        >
          <Card className='mb-1'>
            <Card.Body>
              <Card.Title>Activity</Card.Title>
              <Card.Subtitle className='mb-2'>Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the
              </Card.Text>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card className='mb-1'>
            <Card.Body>
              <Card.Title>Member</Card.Title>
              <Card.Subtitle className='mb-2'>Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the
              </Card.Text>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card className='mb-1'>
            <Card.Body>
              <Card.Title>Organisation</Card.Title>
              <Card.Subtitle className='mb-2'>Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the
              </Card.Text>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card className='mb-1'>
            <Card.Body>
              <Card.Title>Unioin</Card.Title>
              <Card.Subtitle className='mb-2'>Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the
              </Card.Text>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card className='mb-1'>
            <Card.Body>
              <Card.Title>Member 1</Card.Title>
              <Card.Subtitle className='mb-2'>Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the
              </Card.Text>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default SearchComponent;
