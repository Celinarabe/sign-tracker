import React, { useEffect } from "react";
import { useState } from "react";
import * as exifr from "exifr";
import { Sign } from "../models/sign";

const PhotoForm = (props) => {
  const [photoList, setPhotoList] = useState([]);

  const successMsg = "Image uploaded successfully";
  const errorMsg = "Unable to upload image";

  //this function calls extract data and sets state
  const handleChange = async (e) => {
    if (e.target.files) {
      extractData(Array.from(e.target.files))
        .then((convertedFiles) => {
          //if photo list isn't empty, revoke url space in memory
          if (photoList.length !== 0) {
            photoList.forEach((obj) => {
              URL.revokeObjectURL(obj.fileAsURL);
            });
          }
          setPhotoList(convertedFiles);
        })
        .catch((e) => {
          console.log(e);
          console.log("error setting data");
        });
    }
  };

  //this function creates sign object list
  const extractData = (files, idx) => {
    const promises = files.map(async (file) => {
      const { latitude, longitude } = await exifr.gps(file);
      const fileAsURL = URL.createObjectURL(file); //to preview the photo - creates a file in the browser's storage
      return {
        key: idx,
        latitude,
        longitude,
        file,
        fileAsURL,
        submitted: false,
        saveSuccessful: false,
      }; //will this become the storage URL?
    });
    return Promise.all(promises);
  };

  //this function displays photos to be loaded
  const displayPhotos = () => {
    return photoList.map((file) => {
      return (
        <div>
          <img src={file.fileAsURL} alt="sign to be submitted"></img>
          {file.submitted ? (
            <div> {file.saveSuccessful ? successMsg : errorMsg}</div>
          ) : null}
        </div>
      );
    });
  };

  //uploading each file object to storage
  const uploadPhotos = () => {
    photoList.forEach((obj) => {
      obj.submitted = true;
      props.storage.uploadSign(
        "Gij7b83mMQsIiXWapL9A",
        obj,
        () => {},
        errorCallback,
        successCallback
      );
    });
  };

  //create sign object and write to firestore
  const successCallback = (task, fileObj) => {
    fileObj.saveSuccessful = true;

    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log("File available at", downloadURL);
      let newSign = new Sign(
        null,
        downloadURL,
        fileObj.latitude,
        fileObj.longitude
      );
      props.database
        .createSign(newSign, "Gij7b83mMQsIiXWapL9A")
        .then(() => console.log("uploaded successfully"));
    });
  };

  const errorCallback = (error, fileObj) => {
    console.log(error);
    fileObj.saveSuccessful = false;
    let newArr = [...photoList];
    newArr[fileObj.key] = fileObj;
    setPhotoList(newArr);
  };

  //photoList test
  useEffect(() => {
    console.log(photoList);
  }, [photoList]);

  return (
    <div>
      <h2>Upload new signs</h2>
      <input type="file" multiple onChange={handleChange}></input>
      <button onClick={uploadPhotos}>Submit Photos</button>

      {displayPhotos()}
    </div>
  );
};

export default PhotoForm;
