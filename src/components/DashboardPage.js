//component imports
import SignList from "./SignList";
import AlbumList from "./AlbumList"
import SideBar from "./SideBar";
import UploadPhoto from "./UploadPhoto";
import MapContainer from "./MapContainer";

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
  const [campaign, setCampaign] = useState(); //NEED TO QUERY CAMPAIGN BASED ON USER
  const [albumView, setAlbumView] = useState(true);

  console.log(signs);
  const fetchSigns = async () => {
    const signs = await props.database.getSigns("Gij7b83mMQsIiXWapL9A"); //will need to set this to user associated campaign
    setSigns(signs);
  };

  //TODO: fetch campaign based on current user logged in

  //on component did mount
  useEffect(() => {
    fetchSigns();
  }, []);

  return (
    <div>
      <SideBar uploadClick={onOpen} />
      <UploadPhoto isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Box display={{ md: "flex" }} pr="0">
        <Box
          pl="80px"
          pr="20px"
          pt="30px"
          h={{ md: "100vh" }}
          w={{ base: "100vw", md: "50vw" }}
          bg="white"
          overflowY="scroll"
        >
          <SignList signs={signs} campaign={campaign} visibility="hidden"/>
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
