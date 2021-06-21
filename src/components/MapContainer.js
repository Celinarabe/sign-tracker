import React, { Component, useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode"; //TO DO: use this for photo title
import PhotoContext from "../context/PhotoContext";
import SelectedPhotoContext from "../context/SelectedPhotoContext";

//renders
const MapContainer = (props) => {
  const selectedPhoto = SelectedPhotoContext((state) => state.selectedPhoto);
  const [newPhoto, setNewPhoto] = useState({});

  const photos = PhotoContext((state) => state.photoList);
  const [markers, setMarkers] = useState();
  const [bounds, setBounds] = useState();
  const [showingInfo, setShowingInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const mapStyles = {};

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    console.log("actual marker", marker);
    setActiveMarker(marker);
    setShowingInfo(true);
  };

  const showInfoWindow = (photoObj) => {
    console.log("in info funciton");
    setNewPhoto(photoObj);
  };

  //new selected/hovered photo
  useEffect(() => {
    console.log("newPhoto state", newPhoto);
  }, [newPhoto]);

  useEffect(() => {
    console.log("in map", selectedPhoto);
    if (markers) {
      var result = markers.filter((marker) => {
        return marker.key === selectedPhoto.id;
      });
      console.log("marker??", result[0]);

      // setSelectedPlace(result[0].props)
      // setActiveMarker(result[0])
      // setShowingInfo(true)
    }
  }, [selectedPhoto]);

  const createMarkers = () => {
    const photoMarkers = photos.map((photo, idx) => {
      return (
        <Marker
          onClick={onMarkerClick}
          key={photo.id}
          title={photo.title}
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
        {/* TODO: add more to info window */}
        {newPhoto && (
          <InfoWindow
            position={{
              lat: newPhoto.latitude,
              lng: newPhoto.longitude,
            }}
          >
            <h1>hello</h1>
            {/* <div>
              <h3 style={{ "font-weight": "500", margin: "0.5rem 0 1rem 0" }}>
                {newPhoto.title}
              </h3>
              <img
                style={{
                  width: "15rem",
                  "object-fit": "contain",
                  "margin-left": "auto",
                  "margin-right": "auto",
                }}
                alt="marker at this location"
                src={newPhoto.img}
              />
            </div> */}
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
