//file imports
import React, { useState, useEffect, useContext } from "react";
import CreateAlbum from "./CreateAlbum";
import { albumConverter } from "../models/album";
import { AuthContext } from "../context/AuthContext";
import AlbumContext from "../context/AlbumContext";
import {
  Heading,
  Text,
  Button,
  Icon,
  Spinner,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

const AlbumList = (props) => {
  const [albums, setAlbums] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedAlbum = AlbumContext((state) => state.selectedAlbum);
  const addAlbum = AlbumContext((state) => state.addAlbum);

  //fetching albums based on current user logged in
  useEffect(() => {
    //define async function
    const fetchAlbums = async () => {
      setIsLoading(true); //trigger loading state
      const albums = await props.database.getUserAlbums(user.uid); //async function returns promise
      setAlbums(albums); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    fetchAlbums();
  }, [user]); //fetch albums based on current user

  //setting up real time listener on component mount
  useEffect(() => {
    const listener =  () => {
      props.database.db
        .collection("album")
        .where(`roles.${user.uid}`, "==", "owner")
        .onSnapshot((snapshot) => {
          const updated = [];
          snapshot.forEach((doc) => {
            updated.push(albumConverter.fromFirestore(doc));
          });
          console.log("listener on albumList", updated);
          setAlbums(updated);
        });
    };
    return listener;
  }, []);

  //display content after loading
  const displayContent = () => {
    return (
      <div>
        <Text mt="0.5rem" mb="0.7rem" color="blue.300">
          {albums ? <div>{albums.length} Items</div> : null}
        </Text>
        <ul>{displayAlbums(albums)}</ul>
        <Button
          mt={4}
          mb={4}
          ml={1}
          colorScheme="blue"
          variant="ghost"
          onClick={onOpen}
          w="100%"
        >
          <Text color="gray.100">Create New Album... </Text>
        </Button>
      </div>
    );
  };

  //display album list
  const displayAlbums = (arr) => {
    return arr.map((album, idx) => {
      return (
        <div key={album.id}>
          <Button
            h="3rem"
            py={3}
            px={1}
            my={2}
            isFullWidth
            colorScheme="blue"
            variant="ghost"
            onClick={() => handleSelectAlbum(album)}
          >
            <Box
              display="flex"
              w="100%"
              h="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text py={5} color="gray.300">
                {album.title}
              </Text>
              <Icon as={FaAngleRight} boxSize="1.5em" color="gray"></Icon>
            </Box>
          </Button>
          <hr />
        </div>
      );
    });
  };

  //set selected album state
  const handleSelectAlbum = (album) => {
    addAlbum(album);
  };

  //conditionally render albums list
  if (selectedAlbum) {
    return null;
  }
  return (
    <div>
      <Heading mt={4} variant="normal">
        Albums
      </Heading>

      {isLoading ? (
        <Spinner size="md" mt={4} speed="0.65s" color="blue.300" />
      ) : (
        displayContent()
      )}

      {/* Create new album modal */}
      <CreateAlbum
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        database={props.database}
      />
    </div>
  );
};

export default AlbumList;
