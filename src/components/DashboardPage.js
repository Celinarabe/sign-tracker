import React from "react";
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
import "../stylesheets/dashboard.css";

import { AiFillHome, AiFillCamera } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import SignList from "./SignList";
import { Link as ReactLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Box
        position="fixed"
        left={0}
        pt="150px"
        top={0}
        h="100%"
        w="100px"
        bg="blue.100"
      >
        <Stack direction={["column"]} mx={0} spacing="1.5rem">
          <Link as={ReactLink} to="/dashboard">
            <Button variant="ghost" w="100%">
              <Icon as={AiFillHome} w={8} h={8} color="blue.200" />
            </Button>
          </Link>

          <Button variant="ghost"  w="100%">
            <Icon as={AiFillCamera} w={8} h={8} color="blue.200" />
          </Button>
          <Link as={ReactLink} to="/welcome">
          <Button variant="ghost"  w="100%">
            <Icon as={FaUser} w={8} h={8} color="blue.200" />
          </Button>
          </Link>
        </Stack>
      </Box>
      <Box display={{ md: "flex" }}>
        <Box
          pl="120px"
          pr="20px"
          pt="30px"
          h={{ sm: "30vh", md: "100vh" }}
          w={{ md: "50vw" }}
          bg="white"
        >
          <Text>6 Items</Text>
          <Heading variant="normal" mb="2.5rem">
            {" "}
            Educators for PISD
          </Heading>
          <SignList />
        </Box>

        <Box h={{ sm: "70vh", md: "100vh" }} w={{ md: "70vw" }} bg="blue"></Box>
      </Box>
    </div>
  );
};

export default Dashboard;
