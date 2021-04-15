import { FirebaseApp, FirebaseDb } from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";

//TO DO: remove this when we get to production
const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);

const displayCampaigns = (arr) => {
  return arr.map((value, idx) => {
    return (
      <li key={idx}>
        <h1>{value.title}</h1>
        {value.signs.map((sign) => (
          <p>sign ID: {sign.id}</p>
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
    </div>
  );
}

export default App;
