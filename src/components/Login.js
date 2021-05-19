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
