<<<<<<< HEAD
import React from 'react'
import { Button, Flex, Heading, Input, Icon } from "@chakra-ui/react"
import { MdSettings } from "react-icons/md"


const Login = () => {
  return (
    <div>
      <Flex height="50vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>
          <Input placeholder="Email" mb={6} type="email" />
          <Input placeholder="Password" mb={6} type="password" />
        </Flex>
      </Flex>
      
      <Icon as={MdSettings} />

    </div>
  )
}

export default Login

=======
import React, { useState } from "react";


const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value.trim(),
    }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    await props.auth.loginUser(state.email, state.password);
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    console.log(state.email);
    await props.auth.signupUser(state.email, state.password);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    props.auth.auth.signOut();
  };

  return (
    <div>
      <h2>Sign up here!</h2>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={handleChange}
      ></input>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange}
      ></input>
      <button id="btnLogin" type="submit" onClick={handleLoginClick}>
        Log in
      </button>
      <button id="btnSignup" type="submit" onClick={handleSignupClick}>
        Sign Up
      </button>
      <button id="btnLogout" type="submit" onClick={handleLogoutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Login;
>>>>>>> 58d83cbc68c00964bb82fd5b77e1c0df2550914e
