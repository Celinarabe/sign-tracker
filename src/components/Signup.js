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
import LoginContext from "../context/LoginContext";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const Signup = (props) => {
  const history = useHistory();
  const showLogin = LoginContext((state) => state.showLogin);
  const [errorMessage, setErrorMessage] = useState("");

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Please enter a valid email";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (value.length < 6) {
      error = "Password must be minimum 6 characters";
    }
    return error;
  }

  const handleSignupClick = async (email, password) => {
    try {
      await props.auth.signupUser(email, password);
      history.push("/dashboard"); //redirect user to main dashboard page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Heading variant="normal" mt="10%" mb="7%" textAlign="left">
        Sign Up
      </Heading>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          handleSignupClick(values.email, values.password);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <VStack spacing={5} w="100%" mb="1rem">
              <Box w="100%">
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Enter your email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box w="100%">
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Text color="red.600" variant="minor">
                {errorMessage}
              </Text>
              <Button
                mt={4}
                w="100%"
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
      <Text align="center">
        Already have an account?&nbsp;
        <Button
          variant="link"
          color="black"
          onClick={showLogin}
          href=""
          fontWeight="semibold"
        >
          Log in
        </Button>
      </Text>
    </div>
  );
};

export default Signup;
