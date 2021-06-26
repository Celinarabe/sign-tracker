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
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import LoginContext from "../context/LoginContext";
import { IphoneImg, HowToVideo } from "../images";

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
      <Flex direction="column" alignContent="center" w="100vw">
        <Box
          overflowX="hidden"
          overflowY="scroll"
          py="3rem"
          h={{ base: "100vh", md: "80vh" }}
          bg="linear-gradient(90deg, #D8EDDE 0%, rgba(165, 216, 240, 0.98) 100%);"
        >
          <Center mb={4} mt={{ base: "25%", md: "0" }}>
            <Heading
              fontSize={{ base: "6xl", sm: "7xl" }}
              letterSpacing="0.05rem"
              fontWeight="semibold"
              textAlign="center"
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
              fontWeight="semibold"
            >
              Get Started >
            </Button>
          </Center>
          <Center w="100vw" h="50%" mt="5%">
            <Image
              w="50%"
              h="100%"
              objectFit="contain"
              src={IphoneImg}
              alt="map demo"
            />
            {/* // This video will have equal sides */}
          </Center>
        </Box>

        <Box bg="white" py="3rem" h="70vh" px="1rem">
          <Heading
            fontSize={{ base: "4xl", sm: "5xl" }}
            mb="6%"
            letterSpacing="0.05rem"
            fontWeight="semibold"
            textAlign="center"
          >
            How it Works
          </Heading>
          <AspectRatio mb={5} mx="auto" maxW="560px" ratio={4 / 3}>
            <video controls>
              <source src={HowToVideo} type="video/mp4"></source>
            </video>
          </AspectRatio>
        </Box>
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
