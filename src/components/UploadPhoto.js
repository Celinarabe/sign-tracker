import React from "react";
import { useState } from "react";
import * as exifr from "exifr";

const UploadPhoto = () => {
  const [file, setFile] = useState("");
  const [coords, setCoords] = useState("");

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
      <input type="file" onChange={handleUpload}></input>
      <p>Filename: {file.name}</p>
      {file && <img src={URL.createObjectURL(file)} alt="uploaded img"></img>}
      <p>
        Coordinates: {coords.latitude} {coords.longitude}
      </p>
    </div>
  );
};

export default UploadPhoto;
