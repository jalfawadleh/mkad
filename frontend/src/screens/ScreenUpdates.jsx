import Card from "react-bootstrap/esm/Card";
import { LinkContainer } from "react-router-bootstrap";

const UpdatesScreen = () => {
  return (
    <>
      <div style={{ maxWidth: "300px", maxHeight: window.innerHeight }}>
        <Card className='p-1 m-1 text-center h4' style={{ borderRadius: 10 }}>
          <span role='button'>Updates</span>
        </Card>
        <LinkContainer to=''>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Update 1</span>
          </Card>
        </LinkContainer>

        <LinkContainer to=''>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Update 2</span>
          </Card>
        </LinkContainer>

        <LinkContainer to=''>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Update 3</span>
          </Card>
        </LinkContainer>
      </div>
    </>
  );
};

export default UpdatesScreen;
