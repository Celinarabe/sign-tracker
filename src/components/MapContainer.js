import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";

const MapContainer = (props) => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  var bounds = new props.google.maps.LatLngBounds();
  const point = {
    lat: 29.694300000000002,
    lng: -95.4173888888889,
  };
  bounds.extend(point);

  // Geocode.setApiKey("AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo");
  // Geocode.setLocationType("ROOFTOP");
  // Geocode.fromLatLng("29.694300000000002", "-95.4173888888889").then(
  //   (response) => {
  //     const address = response.results[0].formatted_address;
  //     console.log('HERE WE ARE I G')
  //     console.log(address);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  return (
    <Map
      google={props.google}
      bounds={bounds}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 29.694300000000002,
        lng: -95.4173888888889,
      }}
    >
      <Marker
        title={"The marker`s title will appear as a tooltip."}
        name={"SOMA"}
        position={point}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo",
})(MapContainer);
