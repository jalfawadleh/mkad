import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";

function Help() {
  const navigate = useNavigate();

  const closeActivity = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal animation={false} show={true} onHide={closeActivity}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center w-100'>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Help articles
          <Row>
            <Col className='text-center'>
              <LinkContainer to={".."}>
                <Card.Link>
                  <Button variant='success' type='button' className='w-100'>
                    Close
                  </Button>
                </Card.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Help;
