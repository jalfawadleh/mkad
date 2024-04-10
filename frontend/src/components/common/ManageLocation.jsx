import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { SectionForm } from "./Wrappers";

const ManageLocation = ({ location, setParent, editing = false }) => {
  return (
    editing && (
      <>
        <SectionForm>
          <div className='d-block m-1 p-auto text-center'>
            Drag the marker to change location
            <span className='ps-2 text-warning'>- not exact -</span>
          </div>

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
                  setParent((prev) => ({
                    ...prev,
                    location: {
                      lat: e.target._latlng.lat,
                      lng: e.target._latlng.lng,
                    },
                  }));
                },
              }}
            >
              <Popup>
                <span>Drag me</span>
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
