import React, { useEffect } from "react";
import { useState } from "react";
import * as exifr from "exifr";

const UploadPhoto = (props) => {
  const [photoList, setPhotoList] = useState([]);

  //create specific callbacks for this component (progress, error)

  // Handles file upload event
  const handleUpload = async (e) => {
    extractData(Array.from(e.target.files)).then((convertedFiles) => {
      setPhotoList(convertedFiles);
    });
  };

  //can't use await if its not directly inside an async function.
  const extractData = (files) => {
    const promises = files.map(async (file) => {
      const { latitude, longitude } = await exifr.gps(file);
      const fileAsURL = URL.createObjectURL(file);
      return { latitude, longitude, file: fileAsURL };
    });
    return Promise.all(promises);
  };

  //photoList test
  useEffect(() => {
    console.log(photoList);
  }, [photoList]);

  // const displayPhotoData = (arr) => {
  //   console.log(arr);
  //   return arr.map((file, idx) => {
  //     return (
  //       <div>
  //         <p>Filename: {file.name}</p>
  //         <img src={URL.createObjectURL(file)} alt="uploaded img"></img>
  //         <p>
  //           Coordinates: {getExifr(file).latitude} {getExifr(file).longitude}
  //         </p>
  //       </div>
  //     );
  //   });
  // };

  // const getExifr = async (img) => {
  //   const coordinates = await exifr.gps(img); //await extracts result of promise
  //   console.log(coordinates);
  //   return coordinates;
  // };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload}></input>

      {/* <p>
        Coordinates: {coords.latitude} {coords.longitude}
      </p> */}

      {/* {displayPhotoData(fileList)} */}
    </div>
  );
};

export default UploadPhoto;
