//file imports
import { Heading, Text, Icon, Button } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { FaAngleLeft } from "react-icons/fa";
import { useDisclosure, Box, Spinner } from "@chakra-ui/react";
import React, { Component, useEffect, useState, useContext } from "react";
import Photo from "./Photo";

const PhotoList = (props) => {
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    //define async function
    const fetchPhotos = async () => {
      setIsLoading(true); //trigger loading state
      const photoList = await props.database.getPhotos(props.selectedAlbum.id); //async function returns promise
      props.setPhotos(photoList); //resolve the promise by setting state to this response
      setIsLoading(false); //set loading state to false
    };
    if (props.selectedAlbum && user) {
      fetchPhotos();
    }
  }, [props.selectedAlbum.id, user]); //make sure a user is logged in

  const displayContent = () => {
    return (
      <div>
        <Text mt="0.5rem" mb="0.7rem" color="blue.300">
          {props.photos ? props.photos.length : ""} Items
        </Text>
        {props.photos ? displayPhotos() : ""}
      </div>
    );
  };

  const displayPhotos = () =>
    props.photos.map((photo, idx) => {
      return (
        <div key={photo.id}>
          {<Photo title={photo.latitude} imageSrc={photo.image} />}
        </div>
      );
    });
  if (!props.selectedAlbum) {
    return null;
  }

  const handleAlbumView = () => {
    props.setSelectedAlbum("");
    props.setPhotos([{}]);
  };

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
      <Heading mt="1.5rem" variant="normal">
        {props.selectedAlbum.title}
      </Heading>
      {isLoading ? (
        <Spinner size="md" mt={4} speed="0.65s" color="blue.300" />
      ) : (
        displayContent()
      )}
    </div>
  );
};

export default PhotoList;
