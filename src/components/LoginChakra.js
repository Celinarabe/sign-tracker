//file imports
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
  VStack,
} from "@chakra-ui/react";

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
      <VStack spacing={5} w="100%" mb="1rem">
        <Box w="100%">
          <Text>Email</Text>
          <Input placeholder="Enter your email"></Input>
        </Box>
        <Box w="100%">
          <Text>Password</Text>
          <Input placeholder="Enter your password"></Input>
        </Box>

        <Button w="100%" colorScheme="blue">
          Log in
        </Button>
      </VStack>
      <Text align="center">
        Don't have an account?&nbsp;
        <Link href="" fontWeight="semibold">
          Sign up
        </Link>
      </Text>
    </div>
  );
};

export default LoginChakra;
