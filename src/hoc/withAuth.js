import React, { useState, useEffect } from "react";

//this function creates components that subscribe to onAuthStateChanged
//The function accepts 1 arguemt: a child component which is given the subscribed data as a prop

const withAuth = (WrappedComponent, authObject) => {
  const WithAuth = () => {
    const [user, setUser] = useState();

    const handleAuthChange = () => {
      setUser(authObject.auth.currentUser);
      console.log(user);
    };

    //on component did mount
    useEffect(() => {
      const unsubscribe = authObject.auth.onAuthStateChanged(handleAuthChange); //onAuthStateChanged returns firebase.unsubscribe
      return unsubscribe; //useEffect may return a function that cleans up after it when component unmounts
    });

    return <WrappedComponent user={user} />;
  };
  return WithAuth;
};

export default withAuth;
