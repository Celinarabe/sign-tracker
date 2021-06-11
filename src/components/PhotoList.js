//component imports
import Photo from "./Photo";
import StyledDropzone from "./StyledDropzone";
import EditAlbum from "./EditAlbum";

//file imports
import React, { useEffect, useState, useContext } from "react";
import { Heading, Text, Icon, Button } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";

import { FaAngleLeft, FaEllipsisV } from "react-icons/fa";
import {
  useDisclosure,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { photoConverter } from "../models/photo";

import PhotoContext from "../context/PhotoContext";
import AlbumContext from "../context/AlbumContext";

const PhotoList = (props) => {
  const [isLoading, setIsLoading] = useState(true); //loading state
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const user = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addPhotos = PhotoContext((state) => state.addPhotos);
  const removePhotos = PhotoContext((state) => state.removePhotos);
  const photos = PhotoContext((state) => state.photoList);
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);
  const removeAlbum = AlbumContext((state) => state.removeAlbum);

  //fetching photos on selected album change
  useEffect(() => {
    //define async function
    const fetchPhotos = async () => {
      setIsLoading(true); //trigger loading state
      const photoList = await props.database.getPhotos(selectedAlbum.id); //async function returns promise
      addPhotos(photoList); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    if (selectedAlbum && user) {
      //make sure a user is logged in?
      fetchPhotos();
    }
  }, [selectedAlbum]);

  //setting up real time listener for photos sub collection on component mount
  useEffect(() => {
    const listener = () => {
      props.database.db
        .collection("album")
        .doc(selectedAlbum.id)
        .collection("photos")
        .onSnapshot((snapshot) => {
          const updated = [];
          snapshot.forEach((doc) => {
            updated.push(photoConverter.fromFirestore(doc));
          });
          addPhotos(updated);
        });
    };
    return listener;
  }, []);

  // // TO DO: add real time listener for album document name changes
  // useEffect(() => {
  //   const listener = async () => {
  //     await props.database.db
  //       .collection("album")
  //       .doc(selectedAlbum.id)
  //       .onSnapshot((snapshot) => {
  //         console.log("in listenerrr", snapshot);

  //         //const updatedAlbum = doc.data();
  //         // if (updatedAlbum) {
  //         //   addAlbum(doc.data())
  //         // }
  //       });
  //   };
  //   return listener;
  // }, []);

  const displayContent = () => {
    return (
      <div>
        <Text mt="0.5rem" mb="0.7rem" color="blue.300">
          {photos ? photos.length : ""} Items
        </Text>
        {photos ? displayPhotos() : ""}
      </div>
    );
  };

  const displayPhotos = () =>
    photos.map((photo, idx) => {
      return (
        <Box key={photo.id}>
          {<Photo title={photo.latitude} imageSrc={photo.image} />}
        </Box>
      );
    });

  //handle going back to album view
  const handleAlbumView = () => {
    removeAlbum();
    removePhotos();
  };

  const handleMenuSelection = (selection) => {
    setSelectedMenuItem(selection);
    onOpen();
  };

  //conditionally render component if an album was selected
  if (!selectedAlbum) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={handleAlbumView}
        color="gray.300"
        pl={0}
        ml={0}
        variant="link"
        leftIcon={<Icon pl={0} ml={0} as={FaAngleLeft} boxSize="1.5em"></Icon>}
      >
        Albums
      </Button>
      <Flex mt={2} justifyContent={{ md: "space-between" }}>
        <Heading variant="normal">{selectedAlbum.title}</Heading>
        <Menu preventOverflow boundary="scrollParent">
          <MenuButton
            as={IconButton}
           
            aria-label="Options"
            icon={<Icon as={FaEllipsisV}></Icon>}
            variant="outline"
            ml={{ base: "2", md: "0.25rem" }}
            _hover={{ bg: "blue.100" }}
            _focus={{ bg: "blue.100" }}
          />
          {/* TO DO: add menu functionality */}
          <MenuList>
            <MenuItem
              icon={<AddIcon />}
              _hover={{ bg: "blue.100" }}
              _focus={{ bg: "blue.100" }}
              onClick={() => handleMenuSelection("Add Photos")}
            >
              Add photos
            </MenuItem>
            <MenuItem
              icon={<EditIcon />}
              _hover={{ bg: "blue.100" }}
              _focus={{ bg: "blue.100" }}
              onClick={() => handleMenuSelection("Edit Album")}
            >
              Edit Album
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {isLoading ? (
        <Spinner size="md" mt={4} speed="0.65s" color="blue.300" />
      ) : (
        displayContent()
      )}

      <StyledDropzone
        isOpen={isOpen}
        onClose={onClose}
        storage={props.storage}
        database={props.database}
        selectedMenuItem={selectedMenuItem}
      ></StyledDropzone>
      <EditAlbum
        isOpen={isOpen}
        onClose={onClose}
        database={props.database}
        selectedMenuItem={selectedMenuItem}
      ></EditAlbum>
    </div>
  );
};

export default PhotoList;
