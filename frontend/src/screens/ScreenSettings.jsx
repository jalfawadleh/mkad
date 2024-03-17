import Card from "react-bootstrap/esm/Card";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

const ScreenSettings = () => {
  return (
    <>
      <div style={{ width: "300px" }}>
        <Card className='p-1 m-1 text-center h4' style={{ borderRadius: 10 }}>
          <span role='button'>Settings</span>
        </Card>
        <LinkContainer to='editprofile'>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Update Profile</span>
          </Card>
        </LinkContainer>

        <LinkContainer to='editlocation'>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Update Location</span>
          </Card>
        </LinkContainer>

        <LinkContainer to='editaccount'>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Update Account</span>
          </Card>
        </LinkContainer>
        <LinkContainer to='deleteaccount'>
          <Card className='p-1 m-1 text-center' style={{ borderRadius: 10 }}>
            <span role='button'>Delete Account</span>
          </Card>
        </LinkContainer>
      </div>

      <Outlet />
    </>
  );
};

export default ScreenSettings;
