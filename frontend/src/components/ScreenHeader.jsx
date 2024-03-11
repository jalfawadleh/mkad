import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const ScreenHeader = ({ children }) => {
  return (
    <>
      <Row className='p-0 m-0'>
        <Col xs={12} sm={4} md={4} className='p-1 m-0'>
          <Card>
            <Card.Body>
              <Card.Title>{children}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr className='w-100 h-0 m-0' style={{ opacity: 0 }} />
    </>
  );
};

export default ScreenHeader;
