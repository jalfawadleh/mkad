import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store";
import { MapContext } from "../../store";

import Header from "./Header";

const Recenter = () => {
  const { mapCenter } = useContext(MapContext);
  const map = useMap();

  useEffect(() => {
    mapCenter?.lat && map.flyTo(mapCenter, 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCenter]);

  return null;
};

const Map = () => {
  const { user } = useContext(UserContext);

  const [mapCenter, setMapCenter] = useState(user.location);

  const [items, setItems] = useState([]);

  const getMapItems = async () => {
    try {
      await axios.get(`/map`).then((res) => setItems(res.data));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getMapItems();
  }, []);

  const ItemPopup = ({ item }) => (
    <Popup>
      <LinkContainer to={"/" + item.type + "/" + item._id}>
        <span role='button' className='h5 p-0 m-0'>
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
          className: "border rounded-circle border-light bg-black",
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
          iconSize: new L.Point(35, 35),
          iconAnchor: new L.Point(10, 35),
          popupAnchor: new L.Point(8, -30),
          className: "p-1 border rounded-circle border-light bg-black",
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
          className: "p-1 border rounded-circle border-light bg-black",
        })
      }
      position={item.location}
      title={item.name}
    >
      <ItemPopup item={item} />
    </Marker>
  );

  useEffect(() => {
    console.log("center changed" + JSON.stringify(mapCenter));
  }, [mapCenter]);

  return (
    <>
      <MapContext.Provider value={{ mapCenter, setMapCenter, getMapItems }}>
        <div
          className='m-2 p-0 w-100'
          style={{
            maxWidth: "320px",
            maxHeight: window.innerHeight,
            position: "absolute",
          }}
        >
          <Outlet />
        </div>

        <Header />

        <MapContainer
          center={mapCenter}
          zoom={13}
          maxZoom={18}
          minZoom={1}
          zoomControl={false}
          scrollWheelZoom={true}
          className='position-absolute top-0 start-0 end-0 bottom-0'
          style={{ zIndex: -1 }}
        >
          <Recenter location={user.location} />
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
      </MapContext.Provider>
    </>
  );
};

export default Map;
