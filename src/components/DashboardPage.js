//component imports
import PhotoList from "./PhotoList";
import AlbumList from "./AlbumList";
import MapContainer from "./MapContainer";
import SettingsList from "./SettingsList";
import AlbumContext from "../context/AlbumContext";

//file imports
import { useContext, useEffect } from "react";
import {
  Box,
  Menu,
  MenuButton,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { withRouter, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

//css imports
import "../stylesheets/dashboard.css";

const DashboardPage = (props) => {
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);
  const user = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();
  useEffect(() => {
    if (user.email) {
      console.log(user);
      toast({
        title: `Welcome, ${user.email}`,
        position: "top",
        duration: 2000,
      });
    }
  }, [user]);

  if (!user) {
    history.push("/");
    return null;
  }

  return (
    <div>
      {/* Left side with album/signs list */}
      <Flex
        display={{ base: "flex", md: "flex" }}
        pr="0"
        justify={{ base: "space-between", md: "" }}
        direction={{ base: "column", md: "row" }}
        h="100vh"
      >
        <Box
          pl="2rem"
          pt={4}
          pr="20px"
          h={{ base: "50vh",md: "100vh" }}
          w={{ base: "100vw", md: "45%" }}
          bg="white"
          overflowY="scroll"
        >
          {/* Settings button */}
          <Menu>
            <MenuButton
              display={{ md: "none" }}
              position="absolute"
              mt={2}
              right={3}
              as={IconButton}
              size="lg"
              aria-label="Options"
              _hover={{ bg: "blue.100" }}
              _focus={{ bg: "blue.100" }}
              icon={<SettingsIcon boxSize={5} color="gray.300" />}
              variant="ghost"
            ></MenuButton>

            <SettingsList auth={props.auth} storage={props.storage} database={props.database}/>
          </Menu>
          {selectedAlbum ? (
            <PhotoList database={props.database} storage={props.storage} />
          ) : (
            <AlbumList database={props.database} />
          )}
          {/* settings button */}
          <Menu colorScheme="blue">
            <MenuButton
              display={{ base: "none", md: "block" }}
              position="absolute"
              bottom={3}
              as={IconButton}
              size="lg"
              aria-label="Options"
              icon={<SettingsIcon boxSize={6} color="gray.300" />}
              variant="ghost"
              _hover={{ bg: "blue.100" }}
              _focus={{ bg: "blue.100" }}
            ></MenuButton>

            <SettingsList auth={props.auth} storage={props.storage} database={props.database}/>
          </Menu>
        </Box>
        {/* Right side with map */}
        <Box
          h={{ base: "50vh", md: "100vh" }}
          w={{ base: "100vw" }}
          position="relative"
          zIndex="base"
        >
          <MapContainer />
        </Box>
      </Flex>
    </div>
  );
};

export default DashboardPage;
