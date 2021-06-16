//component imports
import { PhotoPreview } from "./PhotoPreview";
import { Photo } from "../models/photo";

import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AlbumContext from "../context/AlbumContext";
import Geocode from "react-geocode"; //TO DO: use this for photo title


import * as exifr from "exifr";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

Geocode.setApiKey("AIzaSyBSpE08gglOIu8keG0gZO0B9rDEt9Q3npo")

function StyledDropzone(props) {
  const UnknownTypeMsg =
    "Unaccepted file format. (Needs to be .jpg, .jpeg, or .png.)";
  const UnknownLocationMsg = "Unable to find location data for this photo.";
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);

  const [photoList, setPhotoList] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //this function takes user files and calls extract data and sets state
  const handleChange = (files) => {
    setErrorMessage("");
    if (files) {
      extractData(files)
        .then((convertedFiles) => {
          revokeUrls();
          setPhotoList(photoList.concat(convertedFiles));
        })
        .catch((e) => {
          console.log(e);
          if (e instanceof TypeError) {
            setErrorMessage(UnknownLocationMsg);
          } else {
            setErrorMessage(UnknownTypeMsg);
          }
        });
    }
  };

  //this function gets gps data and creates array of Photo objects
  const extractData = (files, idx) => {
    const promises = files.map(async (file) => {
      const { latitude, longitude } = await exifr.gps(file);
      const address = await Geocode.fromLatLng(latitude, longitude)
      console.log(address)
      const formatted_address = address.results[0].formatted_address.split(',')[0]
      const notes = address.results[0].formatted_address.split(',').slice(1).toString()
      console.log(formatted_address)
      console.log(notes)
      const fileAsURL = URL.createObjectURL(file); //to preview the photo - creates a file in the browser's storage
      return {
        key: idx,
        title: formatted_address,
        latitude,
        longitude,
        file,
        fileAsURL,
        notes,
        completed: false,
        saveSuccessful: false,
        progress: 0,
      };
    });
    return Promise.all(promises);
  };

  //if photo list isn't empty, revoke url space in memory
  const revokeUrls = () => {
    if (photoList.length !== 0) {
      photoList.forEach((obj) => {
        URL.revokeObjectURL(obj.fileAsURL);
      });
    }
  };

  //uploading each file object to storage
  const uploadPhotos = () => {
    setInProgress(true);
    photoList.forEach((obj) => {
      props.storage.uploadPhoto(
        selectedAlbum.id,
        obj,
        progressCallback,
        errorCallback,
        successCallback
      );
    });
  };

  //helper - updating the file state
  const updateFile = (fileObj) => {
    let newArr = [...photoList];
    newArr[fileObj.key] = fileObj;
    setPhotoList(newArr);
  };

  //this function updates a files progress state
  const progressCallback = (progress, fileObj) => {
    fileObj.progress = progress;
    updateFile(fileObj);
  };

  //create Photo object and write to firestore
  const successCallback = (task, fileObj) => {
    fileObj.completed = true;
    fileObj.saveSuccessful = true;
    //updating the files success status
    updateFile(fileObj);

    //writing to firestore
    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
      let newPhoto = new Photo(
        null,
        fileObj.title,
        downloadURL,
        fileObj.latitude,
        fileObj.longitude,
        fileObj.notes
      );
      props.database.createPhoto(newPhoto, selectedAlbum.id).then(() => {
        console.log("image saved successfully");
      });
    });
  };

  const errorCallback = (error, fileObj) => {
    console.log(error);
    fileObj.completed = true;
    fileObj.saveSuccessful = false;
    setInProgress(false);
    //updating the files success status
    updateFile(fileObj);
  };

  const handleExit = () => {
    setPhotoList([]);
    setErrorMessage("");
    setSaveSuccessful(false);
    props.onClose();
  };

  //setting progress state to false once all uploads are done
  useEffect(() => {
    if (photoList.length > 0) {
      for (let i = 0; i < photoList.length; i++) {
        if (!photoList[i].completed) {
          return;
        }
      }
      setInProgress(false);
      setSaveSuccessful(true);
    }
  }, [photoList]);

  //useCallback: the function will be recreated when anything in the dep. array changes
  //good for when you want to prevent a function from being created on every single render
  const onDrop = (acceptedFiles) => {
    handleChange(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  if (props.selectedMenuItem !== "Add Photos") {
    return null;
  }

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={handleExit}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Photos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="container">
            <div {...getRootProps({ style })} hidden={saveSuccessful}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            <Text fontWeight="medium" color="tomato" mt={2}>
              {errorMessage}
            </Text>
            <PhotoPreview photos={photoList} inProgress={inProgress} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            mx={1}
            variant="ghost"
            hidden={saveSuccessful}
            onClick={handleExit}
          >
            Cancel
          </Button>

          <Button
            colorScheme="blue"
            hidden={saveSuccessful}
            onClick={uploadPhotos}
          >
            Upload
          </Button>
          <Button
            colorScheme="blue"
            hidden={!saveSuccessful}
            onClick={handleExit}
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default StyledDropzone;
