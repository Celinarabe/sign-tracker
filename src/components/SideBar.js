//file imports
import {
  Button,
  Flex,
  Heading,
  Input,
  Icon,
  Stack,
  Box,
  Checkbox,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { AiFillHome, AiFillCamera } from "react-icons/ai";
import { FaUser } from "react-icons/fa";


const SideBar = (props) => {
  return (
    <div><Box
    position="fixed"
    left={0}
    pt="150px"
    top={0}
    h="100%"
    w="60px"
    bg="blue.100"
  >
    <Stack direction={["column"]} mx={0} spacing="1.5rem">
      <Link as={ReactLink} to="/dashboard">
        <Button variant="ghost" w="100%">
          <Icon as={AiFillHome} w={8} h={8} color="blue.200" />
        </Button>
      </Link>

      <Button onClick={props.uploadClick}variant="ghost"  w="100%">
        <Icon as={AiFillCamera} w={8} h={8} color="blue.200" />
      </Button>
      <Link as={ReactLink} to="/welcome">
      <Button variant="ghost"  w="100%">
        <Icon as={FaUser} w={8} h={8} color="blue.200" />
      </Button>
      </Link>
    </Stack>
  </Box></div>
  )
}

export default SideBar