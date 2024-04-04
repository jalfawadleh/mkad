import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

import multiavatar from "@multiavatar/multiavatar/esm";

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMapEvent,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { toast } from "react-toastify";

import { UserContext } from "../../store";
import { MapContext } from "../../store";

import Header from "./Header";

const Map = () => {
  const { user } = useContext(UserContext);

  const [mapCenter, setMapCenter] = useState(user.location);
  const [flyToLocation, setFlyToLocation] = useState(null);

  const [items, setItems] = useState({
    members: [],
    activities: [],
    organisations: [],
  });

  const getMapItems = async (location) => {
    await axios
      .post(`/map`, location)
      .then((res) => setItems(res.data))
      .catch((error) => {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      });
  };

  // const SetViewOnClick = () => {
  //   const map = useMapEvent("click", (e) => {
  //     map.setView(e.latlng, map.getZoom(), {
  //       animate: true,
  //     });
  //     setMapCenter(map.getCenter());
  //   });

  //   return null;
  // };

  const Recenter = () => {
    const map = useMapEvent("dragend", () => setMapCenter(map.getCenter()));

    // map.on("moveend", (e) => { getMapItems(map.getCenter()); });

    useEffect(() => {
      if (flyToLocation) {
        setMapCenter(flyToLocation);
        map.flyTo(flyToLocation, 13);
        setFlyToLocation(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flyToLocation]);

    return null;
  };

  useEffect(() => {
    getMapItems(mapCenter);
  }, [mapCenter]);

  const ItemPopup = ({ item }) => (
    <Popup>
      <Link to={"/" + item.type + "/" + item._id}>
        <span role='button' className='h6 p-0 m-0'>
          {item.name}
        </span>
      </Link>
    </Popup>
  );

  const MarkerMember = ({ item }) => (
    <Marker
      key={item._id}
      position={item.location}
      title={item.name}
      icon={
        new L.icon({
          iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
            multiavatar(item.name)
          )}`,
          iconSize: new L.Point(35, 35),
          iconAnchor: new L.Point(18, 18),
          popupAnchor: new L.Point(0, -18),
          className: "",
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
          className: "border border-3 border-warning rounded-circle bg-black",
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
          className: "border border-3 border-success rounded-circle bg-black",
        })
      }
      position={item.location}
      title={item.name}
    >
      <ItemPopup item={item} />
    </Marker>
  );

  // NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
  // eslint-disable-next-line
  const createClusterActivitiesIcon = function (cluster) {
    return L.divIcon({
      html: `
      <div class="d-flex justify-content-center h-100 border-1 border-primary rounded-circle"
        style="background: radial-gradient(green, aquamarine ); box-shadow: 0 0 10px 10px aquamarine ;">
        <div class='d-block m-auto fw-bold text-center h5'>${cluster.getChildCount()}</div>
      </div>`,
      iconSize: L.point(
        cluster.getChildCount() / 3 + 35,
        cluster.getChildCount() / 3 + 35
      ),
      iconAnchor: L.point(0, 0),
      className: "",
    });
  };

  const createClusterOrganisationsIcon = function (cluster) {
    return L.divIcon({
      html: `
      <div class="d-flex justify-content-center h-100 border-1 border-primary rounded-circle"
        style="background: radial-gradient(orangered, gold ); box-shadow: 0 0 10px 10px gold ;">
        <div class='d-block m-auto fw-bold text-center h5'>${cluster.getChildCount()}</div>
      </div>`,
      iconSize: L.point(
        cluster.getChildCount() / 3 + 35,
        cluster.getChildCount() / 3 + 35
      ),
      iconAnchor: L.point(0, 0),
      className: "",
    });
  };

  const createClusterMembersIcon = (cluster) => {
    return L.divIcon({
      html: `
      <div class="d-flex justify-content-center h-100 border-1 border-primary rounded-circle"
        style="background: radial-gradient(blue, aqua ); box-shadow: 0 0 10px 10px aqua ;">
        <div class='d-block m-auto fw-bold text-center h5'>${cluster.getChildCount()}</div>
      </div>`,
      iconSize: L.point(
        cluster.getChildCount() / 3 + 35,
        cluster.getChildCount() / 3 + 35
      ),
      iconAnchor: L.point(0, 0),
      className: "",
    });
  };

  return (
    <>
      <MapContext.Provider value={{ setFlyToLocation }}>
        <div
          className='m-2 p-0 w-100'
          style={{
            maxWidth: "320px",
            maxHeight: window.innerHeight - 100,
            position: "absolute",
          }}
        >
          <Outlet />
        </div>

        <Header />

        <MapContainer
          center={mapCenter}
          zoom={6}
          maxZoom={15}
          minZoom={3}
          zoomControl={false}
          scrollWheelZoom={true}
          className='position-absolute top-0 start-0 end-0 bottom-0'
          style={{ zIndex: -1 }}
        >
          {/* <SetViewOnClick /> */}
          <Recenter />
          <MarkerClusterGroup
            iconCreateFunction={createClusterMembersIcon}
            chunkedLoading
            chunkDelay={2000}
            animate={false}
          >
            {items.members.map((item) => (
              <MarkerMember key={item._id} item={item} />
            ))}
          </MarkerClusterGroup>
          <MarkerClusterGroup
            iconCreateFunction={createClusterOrganisationsIcon}
            maxClusterRadius={150}
            chunkedLoading
          >
            {items.organisations.map((item) => (
              <MarkerOrganisation key={item._id} item={item} />
            ))}
          </MarkerClusterGroup>
          <MarkerClusterGroup
            iconCreateFunction={createClusterActivitiesIcon}
            maxClusterRadius={150}
            chunkedLoading
          >
            {items.activities.map((item) => (
              <MarkerActivity key={item._id} item={item} />
            ))}
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
