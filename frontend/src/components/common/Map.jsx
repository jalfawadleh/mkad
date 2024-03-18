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
import L from "leaflet";

import axios from "axios";
import { toast } from "react-toastify";

import Header from "./Header";

import { UserContext } from "../../store";

const memberIcon = new L.icon({
  iconUrl: ["https://api.multiavatar.com/" + "sdfsdf" + ".png"],
  iconSize: new L.Point(35, 35), // size of the icon
  iconAnchor: new L.Point(18, 18), // point of the icon which will correspond to marker's location
  popupAnchor: new L.Point(0, -18), // point from which the popup should open relative to the iconAnchor
  className: "border rounded-circle border-light ",
});

const activityIcon = new L.icon({
  iconUrl: "./flag.svg",
  iconSize: new L.Point(35, 35), // size of the icon
  iconAnchor: new L.Point(10, 35), // point of the icon which will correspond to marker's location
  popupAnchor: new L.Point(0, -25), // point from which the popup should open relative to the iconAnchor
  className: "border rounded border-danger ",
});

const Map = () => {
  const { user } = useContext(UserContext);

  const [items, setItems] = useState([]);

  useEffect(
    () => async () => {
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
    },
    []
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
            items.map((item) => (
              <Marker
                key={item._id}
                icon={item.type === "activity" ? activityIcon : memberIcon}
                position={
                  item.type === "activity" ? item.locations[0] : item.location
                }
                title={item.name}
                eventHandlers={{
                  click: (e) => {
                    console.log("marker clicked", e);
                  },
                }}
              >
                <Popup>
                  <LinkContainer to={"/" + item.type + "/" + item._id}>
                    <Link className='rounded-circle'>{item.name}</Link>
                  </LinkContainer>
                </Popup>
              </Marker>
            ))}
          {/* 
          <Marker
            icon={activityIcon}
            position={user.location}
            title={"Hello"}
            eventHandlers={{
              click: (e) => {
                console.log("marker clicked", e);
                navigate("/activity/65f77d1b1fea4eae8241ced7");
              },
            }}
          >
            <Popup>I am an Avtivity.</Popup>
          </Marker>
          <Marker
            icon={memberIcon}
            position={user.location}
            title={"Hello"}
            eventHandlers={{
              click: (e) => {
                console.log("marker clicked", e);
              },
            }}
          >
            <Popup>
              I am a Member.
              <LinkContainer to='/activity/65f77d1b1fea4eae8241ced7'>
                <Link className='rounded-circle'>Open My profile</Link>
              </LinkContainer>
            </Popup>
          </Marker> */}
        </MarkerClusterGroup>

        <ZoomControl position='topright' />
        {/* <Marker
          position={{ lng: -122.269, lat: 37.82 }}
          eventHandlers={{
            click: (e) => {
              console.log("marker clicked", e);
              navigate("/activity/65f77d1b1fea4eae8241ced7");
            },
          }}
        >
          <Popup>I am here.</Popup>
        </Marker> */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </>
  );
};

export default Map;
