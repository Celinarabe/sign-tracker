//file imports
import {
  Button,
  Heading,
  Input,
  Box,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext"

const LoginChakra = (props) => {
  //history object is passed into each route as a prop
  //push the route you want the user to be directed to onClick
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [invalidAuth, setInvalidAuth] = useState(false);
  const hideLogin = LoginContext((state) => state.hideLogin)
  const errorMsg = "Invalid Email/Password"

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value.trim(),
    }));
  };

  const handleLoginClick = async (e) => {
    try {
      e.preventDefault();
      await props.auth.loginUser(state.email, state.password);
      history.push("/dashboard"); //redirect user to main dashboard page
    } catch (error) {
      console.log(error);
      setInvalidAuth(true);
    }
  };

  const handleSignup = () => {
    setState({ email: "", password: "" });
    hideLogin()
  };

  return (
    <div>
      <Heading variant="normal" mt="10%" mb="7%" textAlign="left">
        Log in
      </Heading>
     
      <VStack spacing={5} w="100%" mb="1rem">
        <Box w="100%" >
          <Text mb={2}>Email</Text>
          <Input
            id="email"
            onChange={handleChange}
            value={state.email}
            placeholder="Enter your email"
          ></Input>
        </Box>
        <Box w="100%">
          <Text mb={2}>Password</Text>
          <Input
            id="password"
            type="password"
            onChange={handleChange}
            value={state.password}
            placeholder="Enter your password"
          ></Input>
        </Box>
        {invalidAuth ? <Text color="red.600" variant="minor">{errorMsg}</Text> : ""}
        
        <Link as={ReactLink} to="/dashboard" w="100%">
          <Button
            id="btnLogin"
            w="100%"
            colorScheme="blue"
            onClick={handleLoginClick}
            mt={5}
          >
            Log in
          </Button>
        </Link>
        
      </VStack>
      <Text align="center">
        Don't have an account?&nbsp;
        <Button
          variant="link"
          color="black"
          onClick={handleSignup}
          href=""
          fontWeight="semibold"
        >
          Sign up
        </Button>
      </Text>
    </div>
  );
};

export default LoginChakra;
