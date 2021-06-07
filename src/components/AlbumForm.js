import React, { useState, useContext } from "react";
import { Album } from "../models/album";
import { useForm } from "react-hook-form";
import { Heading, Text, Button, Icon, Input } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const AlbumForm = (props) => {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const user = useContext(AuthContext);

  const successMsg = "Success! New Album Created.";
  const errorMsg = "Uh oh! There was an issue creating the Album :(";

  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //updating input box and saving it back to state
  const handleTitleInputChange = (event) => {
    setTitle(
      event.target.value //adding new value
    );
  };

  const handleExit = () => {
    setTitle("");
    setSubmitted(false);
    setSaveSuccessful(false);
    props.onClose();
  };

  //on submit
  const onSubmit = async (e) => {
    let newAlbum = new Album(null, title, user.uid);
    const status = await props.database.writeAlbum(newAlbum);
    setSaveSuccessful(status);
    setSubmitted(true);
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Album</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                isRequired
                placeholder="Album Name"
                value={title}
                onChange={handleTitleInputChange}
                hidden={saveSuccessful}
              />

              {errors.title && <p>Title is required.</p>}
              <Button
                type="submit"
                colorScheme="blue"
                mt={3}
                hidden={saveSuccessful}
              >
                Create
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
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AlbumForm;
