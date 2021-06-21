import React, { Component, useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode"; //TO DO: use this for photo title
import PhotoContext from "../context/PhotoContext";
import { FaPlaceOfWorship } from "react-icons/fa";

//renders
const MapContainer = (props) => {
  const photos = PhotoContext((state) => state.photoList);
  const [markers, setMarkers] = useState();
  const [bounds, setBounds] = useState();

  const [activeMarker, setActiveMarker] = useState();
  const selectedPhoto = PhotoContext((state) => state.selectedPhoto);
  const setSelectedPhoto = PhotoContext((state) => state.hoverPhoto);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const mapStyles = {};

  const onMarkerClick = (props, marker, e) => {
    console.log('actual marker',marker)
    setActiveMarker(marker);
    setSelectedPhoto(props);
    setShowingInfoWindow(true);
  };

  useEffect(() => {
    if (markers) {
      var results = markers.filter((marker) => {
        return selectedPhoto.id === marker.key;
      });
      console.log("filtered results", results[0]);
    }
  }, [selectedPhoto]);

  const createMarkers = () => {
    const photoMarkers = photos.map((photo, idx) => {
      return (
        <Marker
          onClick={(props, marker, e) => onMarkerClick(photo, marker, e)}
          key={photo.id}
          title={photo.title}
          image={photo.image}
          position={{ lat: photo.latitude, lng: photo.longitude }}
        ></Marker>
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

  // useEffect(() => {
  //   console.log("change in selected photo", selectedPhoto);
  // }, [selectedPhoto]);

  // position={{lat:selectedPhoto.latitude, lng:selectedPhoto.longitude }}
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
        {selectedPhoto && (
          <InfoWindow
            marker={activeMarker}
            style={{ width: "50px" }}
            visible={showingInfoWindow}
            onClose={() => {
              setShowingInfoWindow(false);
            }}
          >
            <div>
              <h3
                style={{
                  width: "75%",
                  fontWeight: "500",
                  margin: "0.5rem 0 1rem 0",
                }}
              >
                {selectedPhoto.title}
              </h3>
              <img
                style={{
                  width: "10rem",
                  objectFit: "contain",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                alt="marker at this location"
                src={selectedPhoto.image}
              />
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

//TODO: store this securely
export default GoogleApiWrapper({
  apiKey: "AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo",
})(MapContainer);
