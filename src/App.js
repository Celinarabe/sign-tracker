import { FirebaseApp, FirebaseDb } from "./firebase";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const didMountCampaigns = useRef(false);


  //fetching campaigns
  useEffect(() => {
    //defining async function
    const fetchCampaigns = async () => {
      const campaigns = await db.getCampaigns();
     setCampaigns(campaigns);
       console.log('in fetch: ',campaigns)
      didMountCampaigns.current = true;
    };
    fetchCampaigns();
  }, []);

  console.log('after use effect')

  //mimics component did update
  useEffect(() => {
    if (didMountCampaigns.current) {
      console.log(campaigns[0].title);
    }
  });

  return (
    <div>
      <h1>Campaigns:</h1>
      <p></p>
    </div>
  );
}

export default App;
