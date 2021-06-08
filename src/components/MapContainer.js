import React, { Component, useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";
import PhotoContext from "../context/PhotoContext";

//mapContainer will receive photos list as a prop from dashboard component
const MapContainer = (props) => {
  const photos = PhotoContext((state) => state.photoList);
  const [markers, setMarkers] = useState();
  const [bounds, setBounds] = useState();
  const [showingInfo, setShowingInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const mapStyles = {};

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfo(true);
  };

  const createMarkers = () => {
    const photoMarkers = photos.map((photo, idx) => {
      return (
        // going to need to add more photo data to display in infowindow
        <Marker
          onClick={onMarkerClick}
          key={photo.id}
          title={String(photo.latitude)}
          imgSrc={photo.image}
          position={{ lat: photo.latitude, lng: photo.longitude }}
        />
      );
    });
    setMarkers(photoMarkers);
  };

  const getBounds = () => {
    var mapBounds = new props.google.maps.LatLngBounds();
    //adding bounds to center first marker
    mapBounds.extend({
      lat: photos[0].latitude - 0.01,
      lng: photos[0].longitude - 0.01,
    });
    mapBounds.extend({
      lat: photos[0].latitude + 0.01,
      lng: photos[0].longitude + 0.01,
    });
    //loop through photos list and extend bounds
    for (var i = 0; i < photos.length; i++) {
      mapBounds.extend({
        lat: photos[i].latitude,
        lng: photos[i].longitude,
      });
    }
    setBounds(mapBounds);
  };

  //if changes to photo list occurs
  useEffect(() => {
    if (photos.length > 0) {
      createMarkers();
      getBounds();
    } else {
      setMarkers();
      setBounds();
    }
  }, [photos]);


  return (
    <div>
      <Map
        google={props.google}
        bounds={bounds}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 0, lng: 0 }}
      >
        {markers}
        <InfoWindow marker={activeMarker} visible={showingInfo}>
          <div>
            <h4>{selectedPlace.title}</h4>
            <img alt="random" src={selectedPlace.imgSrc} />
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

//TODO: store this securely
export default GoogleApiWrapper({
  apiKey: "AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo",
})(MapContainer);
