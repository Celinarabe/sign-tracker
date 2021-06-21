//file imports
import {
  Button,
  Flex,
  Heading,
  Box,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

import SelectedPhotoContext from "../context/SelectedPhotoContext";

//this component will accept a photo as props
const Photo = (props) => {
  const setSelectedPhoto = SelectedPhotoContext((state) => state.setSelectedPhoto);
  const [hideEditForm, setHideEditForm] = useState(true);
  const [notes, setNotes] = useState(props.notes);
  const [tempNotes, setTempNotes] = useState(notes);
  const [isLoading, setIsLoading] = useState(false);

  //updating temp notes state
  const handleNotesInputChange = (event) => {
    setTempNotes(
      event.target.value //adding new value
    );
  };

  const handleOpenEdit = () => {
    setTempNotes(notes);
    setHideEditForm(false);
  };

  const handleCloseEdit = () => {
    setNotes(tempNotes);
    setHideEditForm(true);
  };

  const handleSave = async (e) => {
    setIsLoading(true);
    await props.database.updatePhoto(props.albumID, props.photoID, {
      notes: tempNotes,
    });
    setIsLoading(false);
    handleCloseEdit();
  };

  const handlePhotoHover = () => {
    setSelectedPhoto(props.photo)
    console.log('hovered photo:', props.photo)
  }

  const displayNotes = () => {
    if (hideEditForm) {
      return (
        <div>
          <Text mt="1.5rem" mb={0} variant="minor">
            {props.photo.notes}
          </Text>
          <Button
            mr={2}
            size="xs"
            variant="link"
            colorScheme="black"
            onClick={handleOpenEdit}
          >
            Edit note
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Input
            size="xs"
            value={tempNotes}
            onChange={handleNotesInputChange}
          ></Input>
          <Button
            mr={2}
            size="xs"
            variant="link"
            colorScheme="black"
            onClick={handleCloseEdit}
          >
            Cancel
          </Button>

          <Button
            isLoading={isLoading}
            _focus
            disabled={tempNotes === notes}
            mr={2}
            size="xs"
            variant="link"
            colorScheme="black"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      );
    }
  };
  return (
    <div onMouseEnter={handlePhotoHover}>
    <Box _hover={{ color: "blue.200" }}>
      <hr className="line-break" />

      <Flex justify="space-between" my={3} h="7.5rem">
        <Box position="relative">
          <Heading
            
            mb=".1rem"
            mr={1}
            variant="sub"
          >
            {props.photo.title}
          </Heading>
          <Box position="absolute" bottom="0" mb={3}>
            {displayNotes()}
          </Box>
        </Box>

        <Image
          borderRadius="md"
          objectFit="cover"
          h="75%"
          src={props.photo.image}
          mx="10px"
        ></Image>
      </Flex>
    </Box>
    </div>
  );
};

export default Photo;
