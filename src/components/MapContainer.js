import React, { Component, useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";

//mapContainer will receive signs list as a prop from dashboard component
const MapContainer = (props) => {
  const [markers, setMarkers] = useState();
  const [bounds, setBounds] = useState();
  const [showingInfo, setShowingInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const mapStyles = {};

  const onMarkerClick = (props, marker, e) => {
    console.log("were here");
    console.log(props);
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfo(true);
  };

  const createMarkers = () => {
    setMarkers(
      props.signs.map((sign, idx) => {
        console.log(sign.image);
        return (
          // going to need to add more sign data to display in infowindow
          <Marker
            onClick={onMarkerClick}
            key={sign.id}
            title={sign.latitude}
            imgSrc={sign.image}
            position={{ lat: sign.latitude, lng: sign.longitude }}
          />
        );
      })
    );
  };

  const getBounds = () => {
    var mapBounds = new props.google.maps.LatLngBounds();
    //loop through signs list and extend bounds
    for (var i = 0; i < props.signs.length; i++) {
      mapBounds.extend({
        lat: props.signs[i].latitude,
        lng: props.signs[i].longitude,
      });
    }
    setBounds(mapBounds);
  };

  //if changes to sign list occurs
  useEffect(() => {
    if (props.signs) {
      createMarkers();
      getBounds();
    }
  }, [props.signs]);

  return (
    <div>
      <Map
        google={props.google}
        bounds={bounds}
        zoom={14}
        style={mapStyles}
        initialCenter={{}}
      >
        {markers}
        <InfoWindow marker={activeMarker} visible={showingInfo}>
          <div>
            <h4>{selectedPlace.title}</h4>
            <img alt="sign pic" src={selectedPlace.imgSrc} />
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo",
})(MapContainer);
