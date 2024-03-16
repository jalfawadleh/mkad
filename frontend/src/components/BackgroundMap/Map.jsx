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

  const position = { lng: -122.2683, lat: 37.8243 };
  // const position = [122, 37];
  return (
    <>
      <Header />

      <Outlet />

      <MapContainer
        center={{ lng: -122.2683, lat: 37.8243 }}
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
        {/* <ZoomControl position='topright' /> */}

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
}
