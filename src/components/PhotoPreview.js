import React from "react";

import { Progress } from "@chakra-ui/react";
import "../stylesheets/ProgressBar.css";

//this function displays photos to be loaded
const PhotoPreview = (props) => {
  const successMsg = "Image uploaded successfully";
  const errorMsg = "Unable to upload image";

  //display progress bar per photo
  const displayProgress = (file) => {
    return <Progress hasStripe value={file.progress} />;
  };

  //display success/error message per photo
  const displayEndMessage = (file) => {
    return <div> {file.saveSuccessful ? successMsg : errorMsg}</div>;
  };

  //display preview photo per photo
  const displayPreview = () => {
    return props.photos.map((file, idx) => {
      return (
        <div key={idx}>
          <img src={file.fileAsURL} alt="sign to be submitted"></img>
          {props.inProgress ? displayProgress(file) : ""}
          {file.completed ? displayEndMessage(file) : ""}
        </div>
      );
    });
  };

  return <div>{props.photos ? displayPreview() : ""}</div>;
};

export { PhotoPreview };
