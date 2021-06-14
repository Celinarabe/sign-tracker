//file imports
import { Button, Flex, Heading, Box, Text, Image } from "@chakra-ui/react";

//this component will accept a photo as props
const Photo = (props) => {
  return (
    <Box >
      <hr className="line-break" />
      <Flex
        justify="space-between"
        my={3}
        h="7.5rem"
        
      >
        <Box position="relative">
          <Heading mb=".1rem" mr={1} variant="sub">
            {props.title}
          </Heading>
          <Box position="absolute" bottom="0" mb={3}>
            <Text mt="1.5rem" mb={0} variant="minor">
              {props.notes}
            </Text>

            <Button
              size="xs"
              variant="link"
              colorScheme="black"
            >
              Edit note
            </Button>
          </Box>
        </Box>

        <Image
          borderRadius="md"
          objectFit="cover"
          h="75%"
          src={props.imageSrc}
          mx="10px"
        ></Image>
      </Flex>
    </Box>
  );
};

export default Photo;
