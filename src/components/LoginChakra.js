import React from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Icon,
  Stack,
  Box,
  Checkbox,
  Text,
  Link,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";

const LoginChakra = () => {
  return (
    <div>
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
    </div>
  );
};

export default LoginChakra;
