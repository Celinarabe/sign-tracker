import { FirebaseApp, FirebaseDb } from "./firebase";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
let didMountCampaigns = false;

const generateCampaigns = (arr) => {
  didMountCampaigns = true;
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
  //const didMountCampaigns = useRef(false); //reference hook

  //fetching campaigns
  useEffect(() => {
    //defining async function
    const fetchCampaigns = async () => {
      const camps = await db.getCampaigns();
      await setCampaigns(camps);
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
      {didMountCampaigns ? (
        <p>Loading...</p>
      ) : (
        <ul>{generateCampaigns(campaigns)}</ul>
      )}
    </div>
  );
}

export default App;
