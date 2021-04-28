import React from "react";
import "../stylesheets/ProgressBar.css";

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

export { ProgressBar };
