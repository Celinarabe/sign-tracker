//component imports
import { PhotoPreview } from "./PhotoPreview";
import { Sign } from "../models/sign";

import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import * as exifr from "exifr";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
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

function StyledDropzone(props) {
  const [photoList, setPhotoList] = useState([]);
  const [inProgress, setInProgress] = useState(false);

  const revokeUrls = () => {
    //if photo list isn't empty, revoke url space in memory
    if (photoList.length !== 0) {
      photoList.forEach((obj) => {
        URL.revokeObjectURL(obj.fileAsURL);
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
        completed: false,
        saveSuccessful: false,
        progress: 0,
      };
    });
    return Promise.all(promises);
  };

  //this function calls extract data and sets state
  const handleChange = (files) => {
    if (files) {
      console.log("before update:", photoList);
      extractData(files)
        .then((convertedFiles) => {
          revokeUrls();
          console.log("converted files", convertedFiles);
          console.log("current photos:", photoList);
          setPhotoList(photoList.concat(convertedFiles)); //another array
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  //uploading each file object to storage
  const uploadPhotos = () => {
    setInProgress(true);
    photoList.forEach((obj) => {
      props.storage.uploadSign(
        "Gij7b83mMQsIiXWapL9A", //CAMPAIGN AGAIN
        obj,
        progressCallback,
        errorCallback,
        successCallback
      );
    });
  };

  const progressCallback = (progress, fileObj) => {
    console.log("Upload is " + progress + "% done");
    fileObj.progress = progress;
    let newArr = [...photoList];
    newArr[fileObj.key] = fileObj;
    setPhotoList(newArr);
  };

  //create sign object and write to firestore
  const successCallback = (task, fileObj) => {
    fileObj.completed = true;
    fileObj.saveSuccessful = true;
    //set state here
    let newArr = [...photoList];
    newArr[fileObj.key] = fileObj;
    setPhotoList(newArr);
    //writing to firestore
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
    fileObj.completed = true;
    fileObj.saveSuccessful = false;
    setInProgress(false);
    let newArr = [...photoList];
    newArr[fileObj.key] = fileObj;
    setPhotoList(newArr);
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
    }
  }, [photoList]);

  const onDrop = (acceptedFiles) => {
    // Do something with the files
    console.log("accepted from drop zone", acceptedFiles);

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

  useEffect(() => {
    console.log("current photo list:", photoList);
  }, [photoList]);

  console.log("after update", photoList);

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent top="10rem">
        <ModalHeader>Add Photos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted>
            <TabList>
              <Tab>Upload Photo</Tab>
              <Tab>Take a Photo</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div className="container">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <PhotoPreview photos={photoList} inProgress={inProgress} />
                </div>
              </TabPanel>

              <TabPanel>
                <p>Coming Soon &#128516;</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button mx={1} variant="ghost">
            Cancel
          </Button>

          <Button colorScheme="blue" onClick={uploadPhotos}>
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default StyledDropzone;
