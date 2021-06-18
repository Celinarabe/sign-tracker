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
import PhotoContext from "../context/PhotoContext";
import { useToast } from "@chakra-ui/react";

const DeleteAlbum = (props) => {
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);
  const removeAlbum = AlbumContext((state) => state.removeAlbum);
  const photos = PhotoContext((state) => state.photoList);
  const toast = useToast();

  const deleteSuccessMsg = "Album successfully deleted";
  const deleteErrorMsg = "Unable to delete album";

  //handle confirm delete click
  const handleConfirmDelete = async (e) => {
    try {
      await props.storage.deletePhotoFolder(selectedAlbum.id);
      await props.database.deleteAlbumPhotos(selectedAlbum.id, photos);
      await props.database.deleteAlbum(selectedAlbum.id);
      handleExit();
      removeAlbum(); //remove album focus and return to album list
      createToast(deleteSuccessMsg, "success");
    } catch {
      handleExit(); //return to photo list
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
      duration: 2000,
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
