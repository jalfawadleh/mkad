import Card from "react-bootstrap/esm/Card";

const ScreenHeader = ({ children }) => {
  return (
    <>
      <Card className='p-1 m-0' style={{ width: "300px" }}>
        <Card.Title className='text-center p-0 m-0'>{children}</Card.Title>
      </Card>

      <hr className='w-100 h-0 m-0' style={{ opacity: 0 }} />
    </>
  );
};

export default ScreenHeader;
