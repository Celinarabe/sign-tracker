import { FirebaseApp, FirebaseDb } from "./firebase";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);


const generateCampaigns = (arr) => {
  return arr.map((value, idx) => {
    return (
      <li key={idx}>
        <h1>{value.title}</h1>
        <p>{value.signs}</p>
      </li>
    );
  });
};

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const didMountCampaigns = useRef(false); //reference hook

  //fetching campaigns
  useEffect(() => {
    //defining async function
    const fetchCampaigns = async () => {
      const camps = await db.getCampaigns();
      await setCampaigns(camps);
      didMountCampaigns.current = true;
    };
    fetchCampaigns();
  }, []);

  //mimics component did update
  useEffect(() => {
    if (didMountCampaigns.current) {
      console.log("did mount", campaigns);
    }
  });

  return (
    <div>
      {didMountCampaigns.current ? (
        <p>Loading...</p>
      ) : (
        <ul>{generateCampaigns(campaigns)}</ul>
      )}
    </div>
  );
}

export default App;
