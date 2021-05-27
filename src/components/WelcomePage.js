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
} from "@chakra-ui/react";

const WelcomePage = () => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <Box h="100%" w="100%" bg="blue.200">
          <Flex h="60%" w="100%" ml="5%" align="flex-end" mb="5%">
            <Heading variant="jumbo" color="white">
              Photo
              <br /> Map
            </Heading>
          </Flex>
          <Flex mt="15%" justify="center">
            <Button bg="gray.100" color="#4E4F67" fontSize="2vw">
              Try it out!
            </Button>
          </Flex>
        </Box>

        <Box bg="white" height="100vh" p="5% 5%">
          <Heading variant="normal" mt="10%" mb="5%">
            Log in
          </Heading>
          <Stack direction={["column"]} spacing="1em" mb="3em">
            <Box>
              <Text>Email</Text>
              <Input placeholder="Enter your email"></Input>
            </Box>
            <Box>
              <Text>Password</Text>
              <Input placeholder="Enter your password"></Input>
            </Box>
            <Box>
              <Checkbox mt="1%">Keep me logged in</Checkbox>
            </Box>
            <Button w="100%" colorScheme="blue">
              Log in
            </Button>
          </Stack>
          <Text align="center">
            Don't have an account?
            <b style={{fontWeight: "600"}}> Sign up </b>
          </Text>

          <Text align="center">
            <b style={{fontWeight: "600"}}>Forgot password?</b>
          </Text>
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
