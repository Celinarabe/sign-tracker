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

const LoginChakra = (props) => {
  //history object is passed into each route as a prop
  //push the route you want the user to be directed to onClick
  const history = useHistory();
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
    history.push("/dashboard"); //redirect user to main dashboard page
  };

  //TO DO: create sign up form
  const handleSignupClick = async (e) => {
    e.preventDefault();
    await props.auth.signupUser(state.email, state.password);
    history.push("/"); //redirect user to main dashboard page
  };

  return (
    <div>
      <Heading variant="normal" mt="10%" mb="7%" textAlign="left">
        Log in
      </Heading>
      <VStack spacing={5} w="100%" mb="1rem">
        <Box w="100%">
          <Text>Email</Text>
          <Input
            id="email"
            onChange={handleChange}
            value={state.email}
            placeholder="Enter your email"
          ></Input>
        </Box>
        <Box w="100%">
          <Text>Password</Text>
          <Input
            id="password"
            type="password"
            onChange={handleChange}
            value={state.password}
            placeholder="Enter your password"
          ></Input>
        </Box>

        <Link as={ReactLink} to="/dashboard" w="100%">
          <Button
            id="btnLogin"
            w="100%"
            colorScheme="blue"
            onClick={handleLoginClick}
          >
            Log in
          </Button>
        </Link>
      </VStack>
      <Text align="center">
        Don't have an account?&nbsp;
        <Link href="" fontWeight="semibold">
          Sign up
        </Link>
      </Text>
    </div>
  );
};

export default LoginChakra;
