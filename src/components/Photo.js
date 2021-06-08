//file imports
import { Button, Flex, Heading, Box, Text, Image } from "@chakra-ui/react";

//this component will accept a sign as props
const Sign = (props) => {
  console.log(props.sign);
  return (
    <div>
      <hr className="line-break" />
      <Flex justify="space-between" my={3} >
        <Box position="relative">
          <Heading  w="7rem"mb=".1rem" variant="sub">
            {props.title}
          </Heading>
          <Text mb="1rem" variant="minor">
            Taken on: 4/28/21
          </Text>
          <Text mb="1.5rem" variant="minor">
            Big Sign
          </Text>
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
          h="7rem"
          src={props.imageSrc}
          mx="10px"
        ></Image>
      </Flex>
    </div>
  );
};

export default Sign;
