import React, { useState } from "react";
import { Campaign } from "../models/campaign";
import { FirebaseApp, FirebaseDb } from "../firebase";

const CampaignForm = (props) => {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  const successMsg = "Success! New Campaign Created.";
  const errorMsg = "Uh oh! There was an issue creating the campaign :(";

  //updating input box and saving it back to state
  const handleTitleInputChange = (event) => {
    setTitle(
      event.target.value //adding new value
    );
  };

  //on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (title) {
      let newCamp = new Campaign(null, title, []);
      const status = await props.database.writeCampaign(newCamp);
      console.log("db status", status);
      //status ? setSaveSuccessful(true) : setSaveSuccessful(false);
      setSaveSuccessful(status);
      console.log("react state", saveSuccessful);
      if (status) {
        //setTitle("");
        //setSubmitted(false);
      }
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="title"
          type="text"
          placeholder="Campaign Title"
          name="title"
          value={title}
          onChange={handleTitleInputChange}
        />
        {submitted && !title ? (
          <span id="title-error">Please enter a title</span>
        ) : (
          ""
        )}
        <button type="submit">Create Campaign</button>
      </form>
      {/* need to add timer to show success message for 5 seconds after submit  */}
      {submitted && title ? (
        <div> {saveSuccessful ? successMsg : errorMsg}</div>
      ) : null}
    </div>
  );
};

export default CampaignForm;
