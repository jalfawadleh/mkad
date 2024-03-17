// import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  LayersControl,
  LayerGroup,
  Circle,
} from "react-leaflet";

import Header from "../common/Header";

// import { UserContext } from "../../store";

const Map = () => {
  // const navigate = useNavigate();

  // const { user } = useContext(UserContext);

  const position = { lng: -122.2683, lat: 37.8243 };

  return (
    <>
      <Header />

      <Outlet />

      <MapContainer
        center={position}
        zoom={13}
        zoomControl={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <ZoomControl position='topright' />
        <Marker position={{ lng: -122.269, lat: 37.82 }}>
          <Popup>I am here.</Popup>
        </Marker>
        <Marker position={{ lng: -122.27, lat: 37.83 }}>
          <Popup>I am here.</Popup>
        </Marker>
        <Marker position={{ lng: -122.25, lat: 37.84 }}>
          <Popup>I am here.</Popup>
        </Marker>
        <Marker position={position}>
          <Popup>I am here.</Popup>
        </Marker>
        <Marker position={position}>
          <Popup>I am here.</Popup>
        </Marker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </>
  );
};

export default Map;
