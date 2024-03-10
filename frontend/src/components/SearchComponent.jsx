import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";

import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

const SearchComponent = () => {
  const { innerHeight } = window;
  return (
    <>
      <div
        className='p-2 m-1 bg-dark'
        style={{
          float: "relative",
          maxWidth: 400,
          height: 45,
          borderRadius: 10,
        }}
      >
        <InputGroup size='sm'>
          <Form.Control
            placeholder='Search ...'
            aria-label='Search ...'
            aria-describedby='basic-addon2'
          />
          <Button variant='outline-primary' id='button-addon2'>
            Search
          </Button>
        </InputGroup>
      </div>

      <Container
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
              Some quick example text to build on the card title and make up the
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
              Some quick example text to build on the card title and make up the
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
              Some quick example text to build on the card title and make up the
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
              Some quick example text to build on the card title and make up the
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
              Some quick example text to build on the card title and make up the
            </Card.Text>
            <Card.Link href='#'>Card Link</Card.Link>
            <Card.Link href='#'>Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SearchComponent;
