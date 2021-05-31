//component imports
import LoginChakra from "./LoginChakra";

//file imports
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
  Icon,
} from "@chakra-ui/react";
import { MapBg } from "../images/";
import { Link as ReactLink } from "react-router-dom";
import { useRef } from "react";

const WelcomePage = () => {
  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth" });
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  return (
    <div>
      <Box display={{ md: "flex" }}>
        <Box
          bgImage={MapBg}
          borderRadius={{ base: "0", md: "0 20% 20% 0" }}
          bgSize="100% 100%"
          p="5% 5%"
          h="100vh"
          w={{ base: "100vw", md: "60vw" }}
        >
          <Flex h="55%" w="full" align="flex-end" mb="5%">
            <Heading variant="jumbo" color="white">
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

            {/* Need to add either a drawer or scroll to login section */}
            <Button
              onClick={executeScroll}
              display={{ base: "block", md: "none" }}
              bg="gray.100"
              color="#4E4F67"
              w="150px"
            >
              Log in
            </Button>
          </VStack>
        </Box>
        <div ref={myRef}>
          <Box bg="white" height="100vh" p="5% 5%" w={{ md: "50vw" }}>
            <LoginChakra />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default WelcomePage;
