import React from "react";

import { Progress } from "@chakra-ui/react"
import "../stylesheets/ProgressBar.css";

//this function displays photos to be loaded
const PhotoPreview = (props) => {
  const successMsg = "Image uploaded successfully";
  const errorMsg = "Unable to upload image";

  return props.photos? props.photos.map((file, idx) => {
    return (
      <div key={idx}>
        <img src={file.fileAsURL} alt="sign to be submitted"></img>
        {props.inProgress ? <Progress hasStripe value={file.progress} /> : ""}
        {file.completed ? (
          <div> {file.saveSuccessful ? successMsg : errorMsg}</div>
        ) : null}
      </div>
    );
  }) : "";
};



export { PhotoPreview };
