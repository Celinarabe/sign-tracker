//component imports
import SignList from "./SignList";
import SideBar from "./SideBar";

//file imports
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Flex,
  Heading,
  Input,
  Box,
  Text,
  Container,
  SimpleGrid,
  Center,
  Checkbox,
  VStack,
  Stack,
  Link,
  Image,
  Icon,
} from "@chakra-ui/react";

//css imports
import "../stylesheets/dashboard.css";

const Dashboard = () => {
  //will need access to user object
  const user = useContext(AuthContext);
  return (
    <div>
      <SideBar />

      <Box display={{ md: "flex" }}>
        <Box
          pl="80px"
          pr="20px"
          pt="30px"
          h={{ md: "100vh" }}
          w={{ base: "100vh", md: "50vw" }}
          bg="white"
          overflowY="scroll"
        >
          <SignList />
        </Box>

        <Box
          h={{ base: "50vh", md: "100vh" }}
          w={{ base: "100vw", md: "70vw" }}
          bg="blue"
        ></Box>
      </Box>
    </div>
  );
};

export default Dashboard;
