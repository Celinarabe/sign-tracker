import { MenuList, MenuItem, Text, Icon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiExit } from "react-icons/bi";
import { withRouter, useHistory } from "react-router-dom";
import { useToast, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react"

const SettingsList = (props) => {
  //TODO: handle delete account
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const successfulDeleteMsg = "Successfully deleted account";
  const errorDeleteMsg = "There was an error deleting this account.";
  const successfulLogoutMsg = "Successfully logged out";
  const errorLogoutMsg = "There was an error logging out";

  const handleLogoutClick = (e) => {
    try {
      props.auth.auth.signOut();
      history.push("/");
      toast({
        title: successfulLogoutMsg,
        position: "top",
        status: "success",
      });
    } catch {
      toast({
        title: errorLogoutMsg,
        position: "top",
        status: "error",
      });
    }
  };

  const handleDeleteClick = (e) => {
    try {
      props.auth.deleteUser();
      history.push("/");
      toast({
        title: successfulDeleteMsg,
        position: "top",
        status: "success",
      });
    } catch {
      toast({
        title: errorDeleteMsg,
        position: "top",
        status: "error",
      });
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
          <ModalBody>
            Are you sure you want to delete your account?
          </ModalBody>

          <ModalFooter>
            
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" mr={3} onClick={handleDeleteClick} >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SettingsList;
