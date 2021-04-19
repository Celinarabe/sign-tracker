import React, { useState } from "react";
import { Campaign } from "../models/campaign";
import { FirebaseApp, FirebaseDb } from "../firebase";

const CampaignForm = (props) => {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState("");

  //updating input box and saving it back to state
  const handleTitleInputChange = (event) => {
    event.persist();
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
      console.log(status);
      status ? setSaveSuccessful(true) : setSaveSuccessful(false);
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>
      <form class="new-campaign-form" onSubmit={handleSubmit}>
        <input
          id="title"
          class="form-field"
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

      {submitted && saveSuccessful ? (
        <div class="success-message">Success! New campign created.</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CampaignForm;
