import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
//file imports
import { Heading, Text } from "@chakra-ui/react";

const AlbumList = (props) => {
  const [albums, setAlbums] = useState([]); //data state
  const [isLoading, setIsLoading] = useState(true); //loading state
  const user = useContext(AuthContext);

  return (
    <div>
      <Text>{props.albums ? props.albums.length : ""} Items</Text>
      <Heading variant="normal" mb="2.5rem">
        Albums
      </Heading>
    </div>
  );
};

export default AlbumList;
