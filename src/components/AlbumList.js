//component importsw
import AlbumForm from "./AlbumForm";
import { albumConverter } from "../models/album";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
//file imports
import { Heading, Text, Button, Icon, Input } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

import { useDisclosure, Box } from "@chakra-ui/react";

const AlbumList = (props) => {
  const [albums, setAlbums] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, [user.uid]);

  useEffect(() => {
    const listener = props.database.db
      .collection("album")
      .where(`roles.${user.uid}`, "==", "owner")
      .onSnapshot((snapshot) => {
        const updated = [];
        snapshot.forEach((doc) => {
          updated.push(albumConverter.fromFirestore(doc));
        });
        setAlbums(updated);
      });
    return listener;
  }, []);

  const displayAlbums = (arr) => {
    return arr.map((album, idx) => {
      return (
        <div key={album.id}>
          <hr />
          <Button
            h="3rem"
            py={3}
            px={1}
            isFullWidth
            colorScheme="blue"
            variant="ghost"
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
        </div>
      );
    });
  };

  useEffect(() => {
    console.log(albums);
  }, [albums]);

  if (!props.albumView) {
    return null;
  }
  return (
    <div>
      <Heading mt="1.5rem" variant="normal">
        Albums
      </Heading>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Text mt="0.5rem" mb="0.7rem" color="blue.300">
              {albums ? <div>{albums.length} Items</div> : null}
            </Text>
            <ul>{displayAlbums(albums)}</ul>
          </div>
        )}
      </div>

      <Button
        mt={4}
        mb={4}
        isFullWidth
        color="gray.100"
        variant="link"
        onClick={onOpen}
      >
        Create New Album
      </Button>

      <AlbumForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        database={props.database}
      />
    </div>
  );
};

export default AlbumList;
