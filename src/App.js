import Firebase from "./Firebase";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./App.css";

const firebaseApp = new Firebase().app;
const db = firebaseApp.firestore();

function App() {
  useEffect(() => {
    db.collection("campaign").doc().collection("signs").add({
      notes: "great sign location",
    });
  });

  return <div></div>;
}

export default App;
