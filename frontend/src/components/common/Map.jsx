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

  const iconOrganisation = `<svg fill="#ffffff" width="27px" height="27px" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M570.69,236.27,512,184.44V48a16,16,0,0,0-16-16H432a16,16,0,0,0-16,16V99.67L314.78,10.3C308.5,4.61,296.53,0,288,0s-20.46,4.61-26.74,10.3l-256,226A18.27,18.27,0,0,0,0,248.2a18.64,18.64,0,0,0,4.09,10.71L25.5,282.7a21.14,21.14,0,0,0,12,5.3,21.67,21.67,0,0,0,10.69-4.11l15.9-14V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V269.88l15.91,14A21.94,21.94,0,0,0,538.63,288a20.89,20.89,0,0,0,11.87-5.31l21.41-23.81A21.64,21.64,0,0,0,576,248.19,21,21,0,0,0,570.69,236.27ZM288,176a64,64,0,1,1-64,64A64,64,0,0,1,288,176ZM400,448H176a16,16,0,0,1-16-16,96,96,0,0,1,96-96h64a96,96,0,0,1,96,96A16,16,0,0,1,400,448Z"/></g></svg>`;
  const iconActivity = `<svg viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="#ffffff"></path> </g></svg>`;
  const iconMKaDifference = `
  <div class="p-auto rounded-circle bg-black" style="width:30px; height:30px; box-shadow: gold 0px 0px 5px 5px;">
    <div class="m-auto p-auto" >
      <svg fill="#ffffff" width="24" height="24" viewBox="20 -40 350 350" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="m202.13 132.55q-9.2643-10.376-25.755-24.828-18.158-15.935-24.458-25.014-6.2997-9.2642-6.2997-20.196 0-16.305 15.193-25.569 15.193-9.4495 39.651-9.4495 24.458 0 42.615 8.3378 18.343 8.3379 18.343 22.975 0 7.0408-4.4448 11.673-4.4448 4.632-10.376 4.632-8.5227 0-20.011-12.785-11.673-12.97-19.825-18.158-7.9673-5.373-18.714-5.373-13.711 0-22.605 6.1144-8.7088 6.1144-8.7088 15.564 0 8.8936 7.2262 16.676 7.2262 7.7819 37.242 28.349 32.054 22.049 45.21 34.463 13.34 12.414 21.678 30.202 8.3383 17.787 8.3383 37.613 0 34.834-24.643 61.515-24.458 26.496-57.253 26.496-29.831 0-50.398-21.308-20.566-21.308-20.566-56.882 0-34.278 22.604-57.253 22.79-22.975 55.956-27.793zm8.1521 8.5231q-53.177 8.7083-53.177 73.002 0 33.166 13.155 51.509 13.341 18.343 30.943 18.343 18.343 0 30.201-17.602 11.858-17.787 11.858-47.989 0-43.727-32.981-77.264z"></path></svg>
    </div>
  </div>
  `;

  const [mapCenter, setMapCenter] = useState(user.location);
  const [flyToLocation, setFlyToLocation] = useState(null);

  const [items, setItems] = useState({
    members: [],
    activities: [],
    organisations: [],
  });

  const getMapItems = async (location) => {
    await axios
      .post("/map", location)
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
      <Link
        to={
          "/" +
          (item.type == "activity"
            ? "activities/" + item._id
            : item.type + "s/" + item._id)
        }
      >
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
        new L.divIcon({
          html: iconOrganisation,
          iconSize: new L.Point(35, 35),
          iconAnchor: new L.Point(10, 35),
          popupAnchor: new L.Point(8, -35),
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
        new L.divIcon({
          html: iconActivity,
          iconSize: new L.Point(35, 35),
          iconAnchor: new L.Point(10, 35),
          popupAnchor: new L.Point(8, -35),
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
          className='m-0 p-2 position-absolute w-100'
          style={{
            width: "100%",
            maxWidth: 380,
            maxHeight: window.innerHeight - 100,
          }}
        >
          <Outlet />
        </div>

        <Header />

        <MapContainer
          center={mapCenter}
          zoom={12}
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
          <Marker
            position={{ lng: -122.269, lat: 37.8248 }}
            icon={
              new L.divIcon({
                html: iconMKaDifference,
                iconSize: new L.Point(30, 30),
                iconAnchor: new L.Point(0, 0),
                popupAnchor: new L.Point(8, -35),
                className: "text-center",
              })
            }
            title='MKaDifference'
          >
            <Popup>
              <span role='button' className='h6 p-0 m-0'>
                MkaDifference
              </span>
            </Popup>
          </Marker>

          <ZoomControl position='bottomright' />

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
