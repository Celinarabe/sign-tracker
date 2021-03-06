//component imports
import Photo from "./Photo";
import StyledDropzone from "./StyledDropzone";
import EditAlbum from "./EditAlbum";
import SettingsList from "./SettingsList";

import DeleteAlbum from "./DeleteAlbum";
//file imports
import React, { useEffect, useState, useContext } from "react";
import { Heading, Text, Icon, Button } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";

import { FaAngleLeft, FaEllipsisV } from "react-icons/fa";
import { ImExit } from "react-icons/im";
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
import { AddIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";

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
  const setAlbum = AlbumContext((state) => state.setAlbum);
  const hoverPhoto = PhotoContext((state) => state.hoverPhoto);
  const selectedPhoto = PhotoContext((state) => state.selectedPhoto);

  //fetching photos on selected album change
  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true); //trigger loading state
      const photoList = await props.database.getPhotos(selectedAlbum.id); //async function returns promise
      addPhotos(photoList); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    if (selectedAlbum && user) {
      fetchPhotos();
    }
  }, [selectedAlbum]);

  // //setting up real time listener for photos sub collection on component mount
  useEffect(() => {
    const unsubscibePhotos = props.database.getPhotosListener(
      selectedAlbum,
      (updatedPhotos) => {
        addPhotos(updatedPhotos);
      }
    );
    return () => unsubscibePhotos();
  }, []);

  //setting up real time listener for album title change
  useEffect(() => {
    const unsubscibeAlbum = props.database.getAlbumListener(
      selectedAlbum,
      (updatedAlbum) => {
        setAlbum(updatedAlbum);
      }
    );
    return () => unsubscibeAlbum();
  }, []);

  const handleHover = (photoObj) => {
    hoverPhoto(photoObj);
  };

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
        <Box
          key={photo.id}
          rounded="lg"
          px={2}
          bg={selectedPhoto.id === photo.id ? "blue.100" : "white"}
          onMouseEnter={() => {
            handleHover(photo);
          }}
          onClick={() => {
            handleHover(photo);
          }}
        >
          <hr className="line-break" />
          {
            <Photo
              title={photo.title}
              imageSrc={photo.image}
              notes={photo.notes}
              albumID={selectedAlbum.id}
              photoID={photo.id}
              database={props.database}
            />
          }
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

  return (
    <div>
      <Flex justifyContent="space-between">
        <Button
          onClick={handleAlbumView}
          color="gray.300"
          pl={0}
          ml={0}
          variant="link"
          leftIcon={
            <Icon pl={0} ml={0} as={FaAngleLeft} boxSize="1.5em"></Icon>
          }
        >
          Albums
        </Button>
        <Box>
          {/* Settings button */}
          <Menu mr={0}>
            <MenuButton
              display={{ md: "none" }}
              mt={2}
              as={IconButton}
              size="lg"
              aria-label="Options"
              _hover={{ bg: "blue.100" }}
              _focus={{ bg: "blue.100" }}
              icon={<Icon as={ImExit} boxSize={5} color="gray.300" />}
              variant="ghost"
            ></MenuButton>

            <SettingsList
              auth={props.auth}
              storage={props.storage}
              database={props.database}
            />
          </Menu>
        </Box>
      </Flex>
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
            <MenuItem
              icon={<DeleteIcon />}
              _hover={{ bg: "blue.100" }}
              _focus={{ bg: "blue.100" }}
              onClick={() => handleMenuSelection("Delete Album")}
              color="red.600"
            >
              Delete Album
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
      <DeleteAlbum
        isOpen={isOpen}
        onClose={onClose}
        database={props.database}
        selectedMenuItem={selectedMenuItem}
        storage={props.storage}
      ></DeleteAlbum>
    </div>
  );
};

export default PhotoList;
