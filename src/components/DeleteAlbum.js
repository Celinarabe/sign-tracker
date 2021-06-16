import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
} from "@chakra-ui/react";
import React from "react";
import AlbumContext from "../context/AlbumContext";
import { useToast } from "@chakra-ui/react";

const DeleteAlbum = (props) => {
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);
  const removeAlbum = AlbumContext((state) => state.removeAlbum);
  const toast = useToast();

  const deleteSuccessMsg = "Album successfully deleted";
  const deleteErrorMsg = "An error occurred";

  //handle confirm delete click
  const handleConfirmDelete = async (e) => {
    try {
      await props.database.deleteAlbum(selectedAlbum.id);
      props.onClose();
      removeAlbum(); //remove album focus and return to album list
      createToast(deleteSuccessMsg, "success");
    } catch {
      removeAlbum(); //remove album focus and return to album list
      createToast(deleteErrorMsg, "error");
    }
  };

  const handleExit = () => {
    props.onClose();
  };

  const createToast = (msg, status) => {
    return toast({
      title: msg,
      position: "top",
      status: status,
      duration: 3000,
    });
  };

  //conditionally render modal based on menu selection
  if (props.selectedMenuItem !== "Delete Album") {
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
      <ModalContent>
        <ModalHeader>Delete Album</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this album?</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleConfirmDelete} type="submit" colorScheme="red">
            Yes
          </Button>
          <Button variant="ghost" onClick={handleExit} type="submit">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAlbum;
