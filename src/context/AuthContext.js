import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  const handleAuthChange = () => {
    setUser(props.auth.auth.currentUser);
    console.log(user);
  };

  //on component did mount
  useEffect(() => {
    const unsubscribe = props.auth.auth.onAuthStateChanged(handleAuthChange); //onAuthStateChanged returns firebase.unsubscribe
    return unsubscribe; //useEffect may return a function that cleans up after it when component unmounts
  });

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
