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
} from "@chakra-ui/react";
import { MapBg } from "../images/";
import LoginChakra from "./LoginChakra";
import {Link as ReactLink } from "react-router-dom"

const WelcomePage = () => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <Box
          bgImage={MapBg}
          borderRadius="0 20% 20% 0"
          bgSize="100% 100%"
          p="5% 5%"
        >
          <Flex h="55%" w="full" align="flex-end" mb="5%">
            <Heading variant="jumbo" color="white">
              Photo
              <br /> Mapper
            </Heading>
          </Flex>
          <Flex mt="15%" justify="center">
            <Link as={ReactLink} to="/dashboard">
              <Button bg="gray.100" color="#4E4F67" w="150px">
                Try it out!
              </Button>
            </Link>
          </Flex>
        </Box>

        <Box bg="white" height="100vh" p="5% 5%">
          <LoginChakra />
        </Box>
      </SimpleGrid>
      {/* <Flex height="100vh">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>
          <Input placeholder="Email" mb={6} type="email" />
          <Input placeholder="Password" mb={6} type="password" />
        </Flex>
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>
          <Input placeholder="Email" mb={6} type="email" />
          <Input placeholder="Password" mb={6} type="password" />
        </Flex>
      </Flex> */}
    </div>
  );
};

export default WelcomePage;
