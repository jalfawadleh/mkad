import Card from "react-bootstrap/esm/Card";
import Stack from "react-bootstrap/esm/Stack";

import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { GiGreekTemple } from "react-icons/gi";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { MapContext } from "../../store";

const ListLinks = ({ items }) => {
  const { setMapCenter } = useContext(MapContext);

  return items.map((item) => (
    <Card
      className='p-0 mb-2 button bg-black'
      style={{ borderRadius: 24 }}
      key={item._id}
    >
      <div className='d-flex p-0 m-0'>
        {item.type === "activity" && (
          <span
            role='button'
            className='p-1 m-1 bg-black rounded-pill border border-light-subtle'
          >
            <FaFlag size={24} />
          </span>
        )}

        {item.type === "member" && (
          <span role='button' className='p-1 m-0'>
            <img
              height='34px'
              width='34px'
              src={"https://api.multiavatar.com/" + item.name + ".png"}
              alt='Profile Photo'
              className='p-0 m-0'
            />
          </span>
        )}
        {item.type === "organisation" && (
          <span
            role='button'
            className='p-1 m-1 bg-black rounded-pill border border-light-subtle'
          >
            <GiGreekTemple size={24} />
          </span>
        )}
        <LinkContainer to={item.type + "/" + item._id}>
          <span role='button' className='p-1 w-100 text-center fw-bold'>
            {item.name}
          </span>
        </LinkContainer>
        <span
          role='button'
          className='p-1 m-1 ms-auto bg-black rounded-pill border border-light-subtle'
          onClick={() => setMapCenter(item.location)}
        >
          <FaLocationCrosshairs size={24} />
        </span>
      </div>
    </Card>
  ));
};

export default ListLinks;
