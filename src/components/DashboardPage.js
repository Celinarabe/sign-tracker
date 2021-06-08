//component imports
import PhotoList from "./PhotoList";
import AlbumList from "./AlbumList";
import MapContainer from "./MapContainer";
import StyledDropzone from "./StyledDropzone";

//file imports
import React, { useState, useEffect, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { Box } from "@chakra-ui/react";

//css imports
import "../stylesheets/dashboard.css";

const DashboardPage = (props) => {
  const user = useContext(AuthContext); //user object
  const { isOpen, onOpen, onClose } = useDisclosure(); //modal for photo upload

  return (
    <div>
      <StyledDropzone
        storage={props.storage}
        database={props.database}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

      {/* Left side with album/signs list */}
      <Box display={{ md: "flex" }} pr="0">
        <Box
          pl="2rem"
          pr="20px"
          pt="30px"
          h={{ md: "100vh" }}
          w={{ base: "100vw", md: "35vw" }}
          bg="white"
          overflowY="scroll"
          sx={{ filter: "drop-shadow(0px 0px 1em rgba(0, 0, 0, 0.25))" }}
        >
          <PhotoList database={props.database} />
          <AlbumList database={props.database} />
        </Box>
        {/* Right side with map */}
        <Box
          h={{ base: "50vh", md: "100vh" }}
          w={{ base: "100vw", md: "100%" }}
          bg="blue"
          position="relative"
        >
          <MapContainer />
        </Box>
      </Box>
    </div>
  );
};

export default DashboardPage;
