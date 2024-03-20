import Card from "react-bootstrap/esm/Card";
import Stack from "react-bootstrap/esm/Stack";

import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const ListLinks = ({ items }) => {
  return items.map((item) => (
    <Card
      className='p-0 mb-1 button bg-black'
      style={{ borderRadius: 25 }}
      key={item._id}
    >
      <Stack direction='horizontal' gap={1}>
        {item.type == "activity" ? (
          <span role='button' className='p-1 m-0 ms-auto'>
            <FaFlag size={24} />
          </span>
        ) : (
          <span role='button' className='p-1 m-0 ms-auto'>
            <img
              height='30px'
              width='30px'
              src={"https://api.multiavatar.com/" + item.name + ".png"}
              alt='Profile Photo'
            />
          </span>
        )}

        <LinkContainer to={item.type + "/" + item._id}>
          <span role='button' className='p-1 w-100 text-center fw-bold'>
            {item.name}
          </span>
        </LinkContainer>

        <span role='button' className='p-2 m-0 ms-auto'>
          <FaLocationCrosshairs size={24} />
        </span>
      </Stack>
    </Card>
  ));
};

export default ListLinks;
