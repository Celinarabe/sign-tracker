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
  Image,
  Link,
} from "@chakra-ui/react";
import { Sign1 } from "../images";

const Sign = () => {
  return (
    <div>
      <hr className="line-break" />
      <Flex justify="space-between">
        <Box>
          <Heading mb=".1rem" variant="sub">
            Queens St & Shenandoah
          </Heading>
          <Text mb="1rem" variant="minor">
            Taken on: 4/28/21
          </Text>
          <Text mb="1.5rem">Big Sign</Text>
          <Button variant="link" colorScheme="black">
            Edit note
          </Button>
        </Box>
        <Image
          borderRadius="lg"
          objectFit="cover"
          src={Sign1}
          mx="10px"
        ></Image>
      </Flex>
    </div>
  );
};

export default Sign;
