//component imports
import Photo from "./Photo";

//file imports
import React, { Component, useEffect, useState, useContext } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { photoConverter } from "../models/photo";

import PhotoContext from "../context/PhotoContext";
import AlbumContext from "../context/AlbumContext";

const PhotoList = (props) => {
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure(); //TODO: upload photo modal
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

  //setting up real time listener on component mount
  useEffect(() => {
    const listener = props.database.db
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
    return listener;
  }, []);

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
        <div key={photo.id}>
          {<Photo title={photo.latitude} imageSrc={photo.image} />}
        </div>
      );
    });

  //handle going back to album view
  const handleAlbumView = () => {
    removeAlbum();
    removePhotos();
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
      <Flex mt="1.5rem" justifyContent="space-between">
        <Heading variant="normal">{selectedAlbum.title}</Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={FaEllipsisV}></Icon>}
            variant="outline"
          />
          {/* TO DO: add menu functionality */}
          <MenuList>
            <MenuItem icon={<AddIcon />}>Add photos</MenuItem>
            <MenuItem icon={<EditIcon />}>Edit Album</MenuItem>
            <MenuItem icon={<DeleteIcon />}>Delete album</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {isLoading ? (
        <Spinner size="md" mt={4} speed="0.65s" color="blue.300" />
      ) : (
        displayContent()
      )}
    </div>
  );
};

export default PhotoList;
