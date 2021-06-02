import React from "react";
import "../stylesheets/ProgressBar.css";

//this function displays photos to be loaded
const PhotoPreview = (props) => {
  const successMsg = "Image uploaded successfully";
  const errorMsg = "Unable to upload image";

  return props.photos.map((file) => {
    return (
      <div>
        <img src={file.fileAsURL} alt="sign to be submitted"></img>
        {props.inProgress ? <ProgressBar percentage={file.progress} /> : ""}
        {file.completed ? (
          <div> {file.saveSuccessful ? successMsg : errorMsg}</div>
        ) : null}
      </div>
    );
  });
};

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
      <p>{props.percentage.toFixed(2)}%</p>
    </div>
  );
};

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />;
};

export { PhotoPreview };
