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

  const iconOrganisation = `
  <svg viewBox="0 -1 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="28px" width="28px">
    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="ic_fluent_people_community_28_filled" fill="#ffffff" fill-rule="nonzero">
          <path d="M17.75,18 C18.7164983,18 19.5,18.7835017 19.5,19.75 L19.5,21.7519766 L19.4921156,21.8604403 C19.1813607,23.9866441 17.2715225,25.0090369 14.0667905,25.0090369 C10.8736123,25.0090369 8.93330141,23.9983408 8.51446278,21.8965776 L8.5,21.75 L8.5,19.75 C8.5,18.7835017 9.28350169,18 10.25,18 L17.75,18 Z M18.2439108,11.9999135 L24.25,12 C25.2164983,12 26,12.7835017 26,13.75 L26,15.7519766 L25.9921156,15.8604403 C25.6813607,17.9866441 23.7715225,19.0090369 20.5667905,19.0090369 L20.3985759,19.007437 C20.0900029,17.9045277 19.1110503,17.0815935 17.9288034,17.0057197 L17.75,17 L16.8277704,17.0007255 C17.8477843,16.1757619 18.5,14.9140475 18.5,13.5 C18.5,12.9740145 18.4097576,12.4691063 18.2439108,11.9999135 Z M3.75,12 L9.75608915,11.9999135 C9.59024243,12.4691063 9.5,12.9740145 9.5,13.5 C9.5,14.8308682 10.0777413,16.0267978 10.996103,16.8506678 L11.1722296,17.0007255 L10.25,17 C8.9877951,17 7.92420242,17.85036 7.60086562,19.0094363 L7.5667905,19.0090369 C4.37361228,19.0090369 2.43330141,17.9983408 2.01446278,15.8965776 L2,15.75 L2,13.75 C2,12.7835017 2.78350169,12 3.75,12 Z M14,10 C15.9329966,10 17.5,11.5670034 17.5,13.5 C17.5,15.4329966 15.9329966,17 14,17 C12.0670034,17 10.5,15.4329966 10.5,13.5 C10.5,11.5670034 12.0670034,10 14,10 Z M20.5,4 C22.4329966,4 24,5.56700338 24,7.5 C24,9.43299662 22.4329966,11 20.5,11 C18.5670034,11 17,9.43299662 17,7.5 C17,5.56700338 18.5670034,4 20.5,4 Z M7.5,4 C9.43299662,4 11,5.56700338 11,7.5 C11,9.43299662 9.43299662,11 7.5,11 C5.56700338,11 4,9.43299662 4,7.5 C4,5.56700338 5.56700338,4 7.5,4 Z" id="🎨-Color"></path>
      </g>
    </g>
  </svg>`;
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
    <Popup closeButton={false}>
      <Link
        to={
          "/" +
          (item.type == "activity"
            ? "activities/" + item._id
            : item.type + "s/" + item._id)
        }
        className='m-0 p-0 text-center'
      >
        <div
          role='button'
          className={
            "h6 p-2" +
            (item.type == "activity"
              ? " bg-success text-white"
              : item.type == "member"
              ? " bg-primary text-white"
              : " bg-warning  text-black")
          }
          style={{
            margin: -10,
            marginLeft: -15,
            marginRight: -18,
            borderRadius: 10,
            minWidth: 100,
          }}
        >
          {item.name}
        </div>
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
          className: "border border-3 border-warning rounded-circle bg-warning",
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
          className: "border border-3 border-success rounded-circle bg-success",
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
                iconAnchor: new L.Point(7, 35),
                popupAnchor: new L.Point(8, -35),
                className: "text-center",
              })
            }
            title='MKaDifference'
          >
            <Popup closeButton={false}>
              <span
                role='button'
                className='h6 p-2 bg-black text-white  border border-2 border-warning'
                style={{
                  marginLeft: -15,
                  marginRight: -20,
                  borderRadius: 10,
                  boxShadow: "gold 0px 0px 5px 5px",
                }}
              >
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
