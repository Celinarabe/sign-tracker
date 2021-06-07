//component imports
import SignList from "./SignList";
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

const Dashboard = (props) => {
  const user = useContext(AuthContext); //user object
  const { isOpen, onOpen, onClose } = useDisclosure(); //modal for photo upload
  const [signs, setSigns] = useState([]);
  const [albumView, setAlbumView] = useState(true);

  const fetchSigns = async () => {
    const signs = await props.database.getSigns("Gij7b83mMQsIiXWapL9A"); //will need to set this to user associated campaign
    setSigns(signs);
  };

  return (
    <div>
      <StyledDropzone
        storage={props.storage}
        database={props.database}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

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
          <SignList signs={signs} albumView={albumView} />
          <AlbumList albumView={albumView} database={props.database} />
        </Box>

        <Box
          h={{ base: "50vh", md: "100vh" }}
          w={{ base: "100vw", md: "100%" }}
          bg="blue"
          position="relative"
        >
          <MapContainer signs={signs} />
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
