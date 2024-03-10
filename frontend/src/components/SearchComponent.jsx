import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Navbar from "react-bootstrap/esm/Navbar";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";

const SearchComponent = () => {
  const { innerHeight } = window;
  return (
    <>
      <div className='p-0 m-1 float-left bg-dark' style={{ maxWidth: 300 }}>
        <InputGroup className='p-1 m-0' size='sm'>
          <Form.Control
            placeholder='Search ...'
            aria-label='Search ...'
            aria-describedby='basic-addon2'
          />
          <Button
            variant='outline-primary'
            id='button-addon2'
            className='p-1 m-0'
          >
            Search
          </Button>
        </InputGroup>
      </div>
      <Row
        className='p-1 m-0'
        style={{ height: innerHeight - 100, overflow: "scroll" }}
      >
        <Col xs={12} sm={12} md={9} lg={5}>
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
        </Col>
      </Row>
    </>
  );
};

export default SearchComponent;
