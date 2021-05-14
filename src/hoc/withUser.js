import React, { useState, useEffect } from "react";

//this function creates components that subscribe to onAuthStateChanged
//The function accepts 1 arguemt: a child component which is given the subscribed data as a prop

const withUser = (WrappedComponent, authObject) => {
  const WithUser = () => {
    const [user, setUser] = useState();

    const handleAuthChange = () => {
      setUser(authObject.auth.currentUser);
      console.log(user);
    };

    //on component did mount
    useEffect(() => {
      authObject.auth.onAuthStateChanged(handleAuthChange);
    });

    return <WrappedComponent user={user} />;
  };
  return WithUser;
};

export default withUser;
