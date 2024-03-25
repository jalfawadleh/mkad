import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LinkContainer } from "react-router-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L, { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import axios from "axios";
import { toast } from "react-toastify";

import { GiGreekTemple } from "react-icons/gi";

import Header from "./Header";

import { UserContext } from "../../store";

const Map = () => {
  const { user } = useContext(UserContext);

  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      await axios
        .get(`/map`)
        .then((res) => setItems(res.data))
        .then(() => console.log(items));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getItems();
  }, [user.location]);

  const ItemPopup = ({ item }) => (
    <Popup>
      <LinkContainer to={"/" + item.type + "/" + item._id}>
        <span role='button' className='fw-bold fs-6'>
          {item.name}
        </span>
      </LinkContainer>
    </Popup>
  );

  const MarkerMember = ({ item }) => (
    <Marker
      key={item._id}
      position={item.location}
      title={item.name}
      icon={
        new L.icon({
          iconUrl: ["https://api.multiavatar.com/" + item.name + ".png"],
          iconSize: new L.Point(35, 35),
          iconAnchor: new L.Point(18, 18),
          popupAnchor: new L.Point(0, -18),
          className: "border rounded-circle border-light ",
        })
      }
    >
      <ItemPopup item={item} />
    </Marker>
  );

  const MarkerOrganisation = ({ item }) => (
    <Marker
      key={item._id}
      position={item.location}
      title={item.name}
      icon={
        new L.icon({
          iconUrl: "./organisation.svg",
          iconSize: new L.Point(32, 32),
          iconAnchor: new L.Point(10, 35),
          popupAnchor: new L.Point(8, -30),
        })
      }
    >
      <ItemPopup item={item} />
    </Marker>
  );

  const MarkerActivity = ({ item }) => (
    <Marker
      key={item._id}
      icon={
        new L.icon({
          iconUrl: "./flag.svg",
          iconSize: new L.Point(35, 35),
          iconAnchor: new L.Point(10, 35),
          popupAnchor: new L.Point(8, -27),
        })
      }
      position={item.location}
      title={item.name}
    >
      <ItemPopup item={item} />
    </Marker>
  );

  return (
    <>
      <Header />

      <Outlet />

      <MapContainer
        center={user.location}
        zoom={13}
        maxZoom={18}
        minZoom={1}
        zoomControl={false}
        scrollWheelZoom={true}
        className='position-absolute top-0 start-0 end-0 bottom-0'
        style={{ zIndex: -1 }}
      >
        <MarkerClusterGroup chunkedLoading>
          {items &&
            items.map(
              (item) =>
                item.type === "member" && (
                  <MarkerMember key={item._id} item={item} />
                )
            )}
        </MarkerClusterGroup>
        <MarkerClusterGroup chunkedLoading>
          {items &&
            items.map(
              (item) =>
                item.type === "organisation" && (
                  <MarkerOrganisation key={item._id} item={item} />
                )
            )}
        </MarkerClusterGroup>
        <MarkerClusterGroup chunkedLoading>
          {items &&
            items.map(
              (item) =>
                item.type === "activity" && (
                  <MarkerActivity key={item._id} item={item} />
                )
            )}
        </MarkerClusterGroup>

        <ZoomControl position='topright' />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </>
  );
};

export default Map;
