import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";

//mapContainer will receive signs list as a prop from dashboard component
const MapContainer = (props) => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  //this array will be passed in via props
  // const signs = props.database.getSigns("Gij7b83mMQsIiXWapL9A");
  // const markers = signs.map((sign, idx) => {
  //   return (
  //     <Marker
  //       title={`Sign #${idx + 1}`}
  //       position={{ lat: sign.latitude, lng: sign.longitude }}
  //     />
  //   );
  // });

  //loop through signs list and extend bounds

  //map through signs list and return marker components

  var bounds = new props.google.maps.LatLngBounds();
  const point = {
    lat: 29.694300000000002,
    lng: -95.4173888888889,
  };
  bounds.extend(point);

  return (
    <div>
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
        {markers}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo",
})(MapContainer);
