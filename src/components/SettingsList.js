import { MenuList, MenuItem, Text, Icon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiExit } from "react-icons/bi";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const SettingsList = (props) => {
  //TODO: handle delete account

  const handleLogoutClick = (e) => {
    e.preventDefault();
    props.auth.auth.signOut();
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
          icon={<DeleteIcon color="tomato" />}
        >
          <Text color="tomato">Delete Account</Text>
        </MenuItem>
      </MenuList>
    </div>
  );
};

export default SettingsList;
