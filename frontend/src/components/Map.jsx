import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Navbar";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  LayersControl,
  LayerGroup,
  Circle,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";

export default function Map() {
  const multiPolyline = [
    [
      [51.5, -0.1],
      [51.5, -0.12],
      [51.52, -0.12],
    ],
    [
      [51.5, -0.05],
      [51.5, -0.06],
      [51.52, -0.06],
    ],
  ];
  const limeOptions = { color: "red" };
  const center = [51.505, -0.09];
  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  return (
    <>
      <div className='p-0 m-0 float-xs-start float-sm-start float-md-end float-lg-end'>
        <Navbar bg='dark' className='p-0 m-0' variant='dark'>
          <Nav bg='dark' variant='dark'>
            <LinkContainer to='/'>
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/activities'>
              <Nav.Link>Activities</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/manage'>
              <Nav.Link>Manage</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/messages'>
              <Nav.Link>Messages</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/profile'>
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>

      <Outlet />

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        zoomControl={false}
        attributionControl={false}
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
        <Polyline pathOptions={limeOptions} positions={multiPolyline} />

        <Marker position={[51.505, -0.0]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <LayersControl position='topright'>
          <LayersControl.Overlay name='Marker with popup'>
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='Layer group with circles'>
            <LayerGroup>
              <Circle
                center={center}
                pathOptions={{ fillColor: "blue" }}
                radius={200}
              />
              <Circle
                center={center}
                pathOptions={{ fillColor: "red" }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[51.51, -0.08]}
                  pathOptions={{ color: "green", fillColor: "green" }}
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Feature group'>
            <FeatureGroup pathOptions={{ color: "purple" }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
}
