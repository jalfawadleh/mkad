import Card from "react-bootstrap/esm/Card";

const ScreenHeaderContainer = ({ children }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{children}</Card.Title>
        </Card.Body>
      </Card>
      <hr className='w-100 h-0 m-0' style={{ opacity: 0 }} />
    </>
  );
};

export default ScreenHeaderContainer;
