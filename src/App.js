import {
  FirebaseApp,
  FirebaseAuth,
  FirebaseDb,
  FirebaseStorage,
} from "./firebase";
import React, { useState, useEffect } from "react";
import "./stylesheets/App.css";
import PhotoForm from "./components/PhotoForm";
import CampaignForm from "./components/CampaignForm";
import Login from "./components/Login";
import withUser from "./hoc/withUser";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
const storage = new FirebaseStorage(firebaseApp);
const auth = new FirebaseAuth(firebaseApp);

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

function App(props) {
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
      <h1>Hello, {props.user ? props.user.email : "Guest"}</h1>
      {isLoading ? <p>Loading...</p> : <ul>{displayCampaigns(campaigns)}</ul>}
      <CampaignForm database={db} />
      <PhotoForm storage={storage} database={db} />
      <Login auth={auth} />
    </div>
  );
}

export default withUser(App, auth);
