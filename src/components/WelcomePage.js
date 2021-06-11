//component imports
import LoginChakra from "./LoginChakra";

//file imports
import {
  Button,
  Flex,
  Heading,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
} from "@chakra-ui/react";
import { MapBg } from "../images/";
import { Link as ReactLink } from "react-router-dom";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";

//css imports
import "../stylesheets/welcomePage.css";

const WelcomePage = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <div>
      <Box display={{ md: "flex" }}>
        <Box
          sx={{ filter: "drop-shadow(0px 0px 1em rgba(0, 0, 0, 0.25))" }}
          bgImage={MapBg}
          borderRadius={{ base: "0", md: "0 20% 20% 0" }}
          bgSize="100% 100%"
          p="5% 3%"
          h="100vh"
          w={{ base: "100vw", md: "50vw" }}
        >
          <Flex h="55%" w="100vw" align="flex-end" mb="5%">
            <Heading
              fontSize={{ base: "7xl", sm: "8xl", md: "8xl" }}
              letterSpacing="0.2rem"
              fontWeight="extrabold"
              color="white"
            >
              Photo
              <br /> Mapper
            </Heading>
          </Flex>

          <VStack spacing={4} mt={8}>
            <Link as={ReactLink} to="/dashboard">
              <Button bg="gray.100" color="#4E4F67" w="150px">
                Try it out!
              </Button>
            </Link>

            <Button
              ref={btnRef}
              onClick={onOpen}
              display={{ base: "block", md: "none" }}
              bg="gray.100"
              color="#4E4F67"
              w="150px"
            >
              Log in
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />

                <DrawerBody>
                  <LoginChakra auth={props.auth} />
                </DrawerBody>

                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </VStack>
        </Box>

        <div>
          <Box
            bg="white"
            display={{ base: "none", md: "block" }}
            h="100vh"
            p="5% 8%"
            w={{ md: "40vw" }}
          >
            <LoginChakra auth={props.auth} history={props.history} />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default WelcomePage;
