import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { Link } from "react-router-dom";

const Location = ({ location, editing = false, setParent, user = [] }) => {
  return (
    <>
      {editing && (
        <div className='d-flex p-1 m-1 justify-content-left'>
          <input
            type='checkbox'
            className='btn-check mb-3'
            id='online'
            autoComplete='off'
            checked={location.online}
            onChange={(e) =>
              setParent((prevState) => ({
                ...prevState,
                location: {
                  lat: user.location.lat,
                  lng: user.location.lng,
                  online: e.target.checked,
                  link: "",
                },
              }))
            }
          />
          <label className='btn btn-outline-success ' htmlFor='online'>
            Online Activity
          </label>
          <div className='m-auto'>
            {location.online
              ? "Put the link below"
              : "Drag the Marker to change location"}
          </div>
        </div>
      )}

      {editing && !location.online && (
        <div>
          <MapContainer
            center={location}
            zoom={13}
            maxZoom={18}
            minZoom={1}
            zoomControl={false}
            scrollWheelZoom={true}
            style={{ height: "300px" }}
            dragging={editing}
          >
            <ZoomControl position='topright' />
            <Marker
              draggable={editing}
              position={location}
              eventHandlers={{
                dragend: (e) => {
                  setParent((prevState) => ({
                    ...prevState,
                    location: {
                      lat: e.target._latlng.lat,
                      lng: e.target._latlng.lng,
                      online: false,
                      link: "",
                    },
                  }));
                },
              }}
            >
              <Popup>
                <span>
                  {editing
                    ? "Drag me, don't be accurate"
                    : "Click editing to change location"}
                </span>
              </Popup>
            </Marker>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </MapContainer>
          <hr className='my-1' />
        </div>
      )}

      {editing && location.online && (
        <>
          <div className='form-floating m-1 p-1'>
            <input
              type='text'
              className='form-control'
              id='link'
              placeholder='Description'
              name='link'
              value={location.link}
              onChange={(e) =>
                setParent((prevState) => ({
                  ...prevState,
                  location: {
                    lat: user.location.lat,
                    lng: user.location.lng,
                    online: true,
                    link: e.target.value,
                  },
                }))
              }
            />
            <label htmlFor='link'>Link</label>
          </div>
          <hr className='m-1' />
        </>
      )}

      {location.online}

      {!editing && location.online && (
        <>
          <div className='m-2 d-flex justify-content-around'>
            <div className='my-auto text-center'>ONLINE ACTIVITY</div>

            <Link
              to={location.link}
              target='_blank'
              className='p-2 text-center link-underline link-underline-opacity-0 border border-1 border-primary'
            >
              Open Link
            </Link>
            <div
              role='button'
              className='p-2 text-center border border-1 border-primary text-primary'
              onClick={() => {
                navigator.clipboard.writeText(location.link);
              }}
            >
              Copy Link
            </div>
          </div>
          <hr className='m-1' />
          <div className='p-2 my-2 small'>{location.link}</div>

          <hr className='m-1' />
        </>
      )}
    </>
  );
};

export default Location;
