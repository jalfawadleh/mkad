import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMapEvent,
} from "react-leaflet";
import { SectionForm } from "./Wrappers";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageLocation = ({ location, setParent, editing = false }) => {
  const [flyToLocation, setFlyToLocation] = useState(null);

  const FlytoCity = () => {
    const map = useMapEvent("dragend", () => {
      setParent((prev) => ({ ...prev, location: map.getCenter() }));
    });

    useEffect(() => {
      if (flyToLocation?.lat) {
        map.flyTo(flyToLocation, 12);
        setParent((prev) => ({ ...prev, location: flyToLocation }));
        setFlyToLocation(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flyToLocation]);

    return null;
  };

  const getCity = async (city) => {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`
      )
      .then(({ data }) =>
        setFlyToLocation({ lat: data[0].lat, lon: data[0].lon })
      );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getCity(e.target[0].value);
  };

  return (
    editing && (
      <>
        <SectionForm>
          <div className='d-block m-1 p-auto text-center'>
            Drag the map to change location
            <span className='ps-2 text-warning'>- not exact -</span>
          </div>
          <form onSubmit={onSubmit}>
            <div className='hstack gap-2 mt-2'>
              <label className='d-inline-block p-1 m-auto w-50'>
                Or search by city
              </label>
              <input
                id='city'
                placeholder='Enter City Name'
                type='text'
                className='form-control form-control-sm'
              />
              <button
                type='submit'
                role='button'
                className='m-0 p-1 badge border-0 text-bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </SectionForm>

        <SectionForm>
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
            <FlytoCity />
            <ZoomControl position='topright' />
            <Marker draggable={editing} position={location}>
              <Popup>
                <span>My location</span>
              </Popup>
            </Marker>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </MapContainer>
        </SectionForm>
        <hr className='my-2' />
      </>
    )
  );
};

export default ManageLocation;
