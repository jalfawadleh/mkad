import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

const ManageLocation = ({ location, setParent, editing = false }) => {
  return (
    <>
      {editing && (
        <>
          <div className='inline-block m-1 p-auto text-center'>
            Drag the marker to change location
          </div>
          <div className='inline-block m-1 p-auto text-center text-warning'>
            try not to be very accurate
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
                <span>Drag me</span>
              </Popup>
            </Marker>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </MapContainer>
          <hr className='my-1' />
        </>
      )}
    </>
  );
};

export default ManageLocation;
