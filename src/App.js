import { FirebaseApp, FirebaseDb } from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";

const firebaseApp = new FirebaseApp().app; //creating new firebase app object and pulling the app property from it
const db = new FirebaseDb(firebaseApp);
console.log(db.getCampaigns());

function App() {
  const [campaigns, setCampaigns] = useState(db.getCampaigns());

  useEffect(() => {
    console.log(campaigns);
    console.log(campaigns[0]) //not working
  },[]);

  return (
    <div>
      <h1>Campaigns:</h1>
      <p>{campaigns[0]}</p>

    </div>
  );
}

export default App;
