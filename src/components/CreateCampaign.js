import React, { useState } from "react";
import { Campaign } from "../models/campaign";

const CreateCampaign = () => {
  const [newCampaign, setNewCampaign] = useState({
    title: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  //updating object and saving it back to state
  const handleTitleInputChange = (event) => {
    event.persist();
    setNewCampaign((newCampaign) => ({
      ...newCampaign, //copying old values using spread operator
      title: event.target.value, //adding new value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCampaign.title) {
      setIsValid(true);
    }
    setSubmitted(true);
    //how to generate an id?
    let newCamp = new Campaign(newCampaign.title, []) 
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
          value={newCampaign.title}
          onChange={handleTitleInputChange}
        />
        {submitted && !newCampaign.title ? (
          <span id="title-error">Please enter a title</span>
        ) : (
          ""
        )}
        <button type="submit">Create Campaign</button>
      </form>

      {submitted && isValid ? (
        <div class="success-message">Success! New campign created.</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateCampaign;
