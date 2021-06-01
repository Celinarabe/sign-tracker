//component imports
import SignList from "./SignList";
import SideBar from "./SideBar";
import UploadPhoto from "./UploadPhoto";

//file imports
import React, { useState, useEffect, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
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
  Lorem,
  Link,
  Image,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

//css imports
import "../stylesheets/dashboard.css";

const Dashboard = () => {
  //will need access to user object
  const user = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <SideBar uploadClick={onOpen} />
      <UploadPhoto isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
      
      
      

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
