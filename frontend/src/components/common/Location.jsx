import { Card } from "react-bootstrap";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

const Location = ({ location = [], editing = false, setParent }) => {
  return (
    location && (
      <div>
        <Card.Text>Drag the Marker to change location</Card.Text>
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
                console.log("marker clicked", e.target._latlng);
                setParent((prevState) => ({
                  ...prevState,
                  location: {
                    lat: e.target._latlng.lat,
                    lng: e.target._latlng.lng,
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
      </div>
    )
  );
};

export default Location;
