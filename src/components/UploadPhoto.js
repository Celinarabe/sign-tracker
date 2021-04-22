import React from "react";
import { useState } from "react";
import * as exifr from "exifr";

const UploadPhoto = (props) => {
  const [photos, setPhotos] = useState([]);

  //create specific callbacks for this component (progress, error)


  // Handles file upload event and updates state
  const handleUpload = (event) => {
    //extractData(event.target.files);
    let task = props.storage.signsRef
      .child('12345')
      .child("sign1")
      .put(event.target.files[0]);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    task.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const extractData = async (files) => {};

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
