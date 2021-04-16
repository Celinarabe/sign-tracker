import { FirebaseApp, FirebaseDb } from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";
import EXIF from "exif-js";
import * as exifr from "exifr";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);

const displayCampaigns = (arr) => {
  return arr.map((value, idx) => {
    return (
      <li key={idx}>
        <h1>{value.title}</h1>
        {value.signs.map((sign) => (
          <p>sign ID: {sign.id}</p>
        ))}
      </li>
    );
  });
};

const getExif = (img) => {
  EXIF.getData(img, function () {
    console.log(EXIF.getAllTags(this));
  });
};

function App() {
  const [campaigns, setCampaigns] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
  const [file, setFile] = useState("");
  const [coords, setCoords] = useState("");

  //fetching campaigns
  useEffect(() => {
    //define async function
    const fetchCampaigns = async () => {
      setIsLoading(true); //trigger loading state
      const camps = await db.getCampaigns(); //async function returns promise
      setCampaigns(camps); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    fetchCampaigns(); //when the component mounts, run fetchCampaigns
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  // Handles file upload event and updates state
  const handleUpload = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    getExifr(event.target.files[0]);
  };

  const getExifr = async (img) => {
    const coordinates = await exifr.gps(img);
    setCoords(coordinates);
    console.log(coordinates);
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <ul>{displayCampaigns(campaigns)}</ul>}

      <div>
        <input type="file" onChange={handleUpload}></input>
        <p>Filename: {file.name}</p>
        {file && <img src={URL.createObjectURL(file)} alt="uploaded img"></img>}
        <p>
          Coordinates: {coords.latitude} {coords.longitude}
        </p>
      </div>
    </div>
  );
}

export default App;
