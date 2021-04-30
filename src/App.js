import { FirebaseApp, FirebaseDb, FirebaseStorage } from "./firebase";
import React, { useState, useEffect } from "react";
import "./stylesheets/App.css";
import PhotoForm from "./components/PhotoForm";
import CampaignForm from "./components/CampaignForm";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
const storage = new FirebaseStorage(firebaseApp);

const displayCampaigns = (arr) => {
  return arr.map((campaign, idx) => {
    return (
      <li key={campaign.id}>
        <h1>{campaign.title}</h1>
        {campaign.signs.map((sign) => (
          <div key={sign.id}>
            <p>sign ID: {sign.id}</p>
            <img src={sign.image} alt="sign"></img>
            {/* <p>Posted? {sign.posted ? "yes" : "no"}</p> */}
          </div>
        ))}
      </li>
    );
  });
};

function App() {
  const [campaigns, setCampaigns] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state

  //fetching campaigns
  useEffect(() => {
    //define async function
    const fetchCampaigns = async () => {
      setIsLoading(true); //trigger loading state
      const camps = await db.getCampaigns(); //async function returns promise
      setCampaigns(camps); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    fetchCampaigns(); //when the component mounts, run fetchCampaigns
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <ul>{displayCampaigns(campaigns)}</ul>}
      <CampaignForm database={db} />
      <PhotoForm storage={storage} database={db}/>
    </div>
  );
}

export default App;
