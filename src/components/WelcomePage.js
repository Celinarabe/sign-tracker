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
          <Flex h="55%" w="100%" align="flex-end" mb="5%">
            <Heading variant="jumbo" color="white">
              Photo
              <br /> Mapper
            </Heading>
          </Flex>
          <Flex mt="15%" justify="center">
            <Button bg="gray.100" color="#4E4F67" w="150px">
              Try it out!
            </Button>
          </Flex>
        </Box>

        <Box bg="white" height="100vh" p="5% 5%">
          <Heading
            variant="normal"
            mt="10%"
            mb="7%"
            textAlign={[null, "center", "left"]}
          >
            Log in
          </Heading>
          <Stack direction={["column"]} spacing="1rem" mb="3rem">
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
            <Link href="" fontWeight="semibold">
              Sign up
            </Link>
          </Text>

          <Text align="center">
            <Link href="" fontWeight="semibold">
              Forgot Password?
            </Link>
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
