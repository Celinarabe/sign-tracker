import { MenuList, MenuItem, Text, Icon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiExit } from "react-icons/bi";
import { withRouter, useHistory } from "react-router-dom";
import { useToast, useDisclosure } from "@chakra-ui/react";
import AlbumsContext from "../context/AlbumsContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

const SettingsList = (props) => {
  //TODO: handle delete account
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const albumList = AlbumsContext((state) => state.albumList);

  const successfulDeleteMsg = "Successfully deleted account";
  const errorDeleteMsg = "There was an error deleting this account.";
  const successfulLogoutMsg = "Successfully logged out";
  const errorLogoutMsg = "There was an error logging out";

  const createToast = (msg, status) => {
    return toast({
      title: msg,
      position: "top",
      duration: 2000,
      status: status,
    });
  };

  const handleLogoutClick = (e) => {
    try {
      props.auth.auth.signOut();
      history.push("/");
      createToast(successfulLogoutMsg, "success");
    } catch {
      createToast(errorLogoutMsg, "error");
    }
  };

  const handleDeleteClick = async (e) => {
    try {
      await props.storage.deleteAlbumFolders(albumList); //deleting albums from storage
      await props.database.deleteUserAlbums(albumList); //deleting albums and photos from firestore
      props.auth.deleteUser();
      history.push("/");
      createToast(successfulDeleteMsg, "success");
    } catch {
      createToast(errorDeleteMsg, "error");
    }
  };

  return (
    <div>
      <MenuList>
        <MenuItem
          _hover={{ bg: "blue.100" }}
          _focus={{ bg: "blue.100" }}
          onClick={handleLogoutClick}
          icon={<Icon boxSize={4} as={BiExit} />}
        >
          Sign Out
        </MenuItem>
        <MenuItem
          _hover={{ bg: "blue.100" }}
          _focus={{ bg: "blue.100" }}
          onClick={onOpen}
          icon={<DeleteIcon color="tomato" />}
        >
          <Text color="tomato">Delete Account</Text>
        </MenuItem>
      </MenuList>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete your account?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" mr={3} onClick={handleDeleteClick}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SettingsList;
