//component imports
import LoginChakra from "./LoginChakra";
import Signup from "./Signup";

//file imports
import {
  Button,
  Flex,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import LoginContext from "../context/LoginContext";
import { DeviceImg } from "../images/";
import { IphoneImg } from '../images'

//css imports
import "../stylesheets/welcomePage.css";

const WelcomePage = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const loginPage = LoginContext((state) => state.loginPage);
  const showLogin = LoginContext((state) => state.showLogin);

  const displayForm = () => {
    if (loginPage) {
      return <LoginChakra auth={props.auth} history={props.history} />;
    } else {
      return <Signup auth={props.auth} history={props.history} />;
    }
  };

  useEffect(() => {
    showLogin();
  }, []);

  return (
    <div>
      <Flex
        direction="column"
        alignContent="center"
        py="5%"
        h="100vh"
        bg="linear-gradient(90deg, #D8EDDE 0%, rgba(165, 216, 240, 0.98) 100%);"
      >
        <Center mb={4}>
          <Heading
            fontSize={{ base: "7xl" }}
            letterSpacing="0.05rem"
            fontWeight="medium"
          >
            Photo Mapper
          </Heading>
        </Center>
        <Center>
          <Text fontWeight="medium">
            Map photos with the click of a button.
          </Text>
        </Center>
        <Center mt={2}>
          <Button
            onClick={onOpen}
            variant="ghost"
            colorScheme="blue"
            fontWeight="medium"
          >
            Get Started >
          </Button>
        </Center>
        <Center mt="5%">
          <Image w="50%" objectFit="cover" src={IphoneImg} alt="map demo" />
        </Center>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>{displayForm()}</DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </div>
  );
};

export default WelcomePage;
