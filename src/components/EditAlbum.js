import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Text,
  Input,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import AlbumContext from "../context/AlbumContext";
import { useForm } from "react-hook-form";

const EditAlbum = (props) => {
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);
  const [title, setTitle] = useState(selectedAlbum.title);
  const [submitted, setSubmitted] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  const successMsg = "Success! Album modified.";
  const errorMsg = "Uh oh! There was an issue editing the album :(";

  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //updating album title state
  const handleTitleInputChange = (event) => {
    setTitle(
      event.target.value //adding new value
    );
  };

  //handle edit album click
  const handleSaveChanges = async (e) => {
    console.log("handling save changes click", selectedAlbum.id, title);
    const status = await props.database.writeUpdate(selectedAlbum.id, title);
    setSaveSuccessful(status);
    setSubmitted(true);
  };

  const handleExit = () => {
    setTitle(selectedAlbum.title);
    setSubmitted(false);
    setSaveSuccessful(false);
    props.onClose();
  };

  if (props.selectedMenuItem !== "Edit Album") {
    return null;
  }

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={handleExit}
    >
      <ModalOverlay />
      <ModalContent top="10rem">
        <ModalHeader>Edit Album</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <form hidden={saveSuccessful} onSubmit={handleSubmit(handleSaveChanges)}>
            <Text mb="8px">Album Name:</Text>
            <Input
              isRequired
              placeholder="Album Name"
              value={title}
              onChange={handleTitleInputChange}
              
            />

            {errors.title && <p>Title is required.</p>}
            <Button
              type="submit"
              colorScheme="blue"
              mt={3}
              hidden={handleSaveChanges}
            >
              Save
            </Button>
            <Button
              mt={3}
              variant="ghost"
              onClick={handleExit}
              hidden={saveSuccessful}
            >
              Cancel
            </Button>
          </form>
          {submitted ? (
            <div> {saveSuccessful ? successMsg : errorMsg}</div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={handleExit}
            hidden={!saveSuccessful}
            type="submit"
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAlbum;
