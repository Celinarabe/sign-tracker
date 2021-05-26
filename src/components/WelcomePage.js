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
} from "@chakra-ui/react";


const WelcomePage = () => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <Flex align="center" bg="blue.200" height="100vh">
          <Heading>Sign Tracker</Heading>
          <Container>
            <Button px="30px" size="lg" colorScheme="whiteAlpha" >
              <Text>Try our demo!</Text>
            </Button>
          </Container>
        </Flex>
        <Flex bg="white" height="100vh"></Flex>
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
