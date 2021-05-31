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
  Image,
  Link,
} from "@chakra-ui/react";
import { Sign1 } from "../images";

//this component will accept props in the future but is currently using static data
const Sign = () => {
  return (
    <div>
      <hr className="line-break" />
      <Flex justify="space-between" my={3}>
        <Box position="relative">
          <Heading mb=".1rem" variant="sub">
            Queens St & Shenandoah
          </Heading>
          <Text mb="1rem" variant="minor">
            Taken on: 4/28/21
          </Text>
          <Text mb="1.5rem">Big Sign</Text>
          <Button
            position="absolute"
            bottom="0"
            size="xs"
            variant="link"
            colorScheme="black"
          >
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
