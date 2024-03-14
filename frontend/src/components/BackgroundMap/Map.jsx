import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import Header from "../common/Header";

import { UserContext } from "../../store";

export default function Map() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [center, setCenter] = useState(user.location);

  useEffect(() => {
    setCenter(user.location);
  }, [user.location]);

  return (
    <>
      <Header />

      <Outlet />

      <MapContainer
        center={center}
        zoom={10}
        zoomControl={false}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker
          position={center}
          eventHandlers={{
            click: () => {
              navigate("member/" + user._id);
            },
          }}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <ZoomControl position='topright' />
      </MapContainer>
    </>
  );
}
