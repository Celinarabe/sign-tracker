//component imports
import React, { Component, useEffect, useState } from "react";
import Sign from "./Sign";

//file imports
import { Heading, Text, Icon, Button } from "@chakra-ui/react";
import {FaAngleLeft} from "react-icons/fa"

//this component receives signs as props
//TODO: this component needs campaign as props
const SignList = (props) => {
  const displaySigns = () =>
    props.signs.map((sign, idx) => {
      return <div key={idx}>{<Sign title={sign.latitude} imageSrc={sign.image} />}</div>;
    });
  if (props.albumView) {
    return null;
  }

  return (
    <div>
      <Button color="gray.300"pl={0} ml={0} variant="link"leftIcon={<Icon pl={0}ml={0}as={FaAngleLeft} boxSize="1.5em"></Icon>}>Albums</Button>
      
      <Heading mt="1.5rem"variant="normal" >
        Educators for PISD
      </Heading>
      <Text mt="0.5rem" mb="0.7rem">{props.signs ? props.signs.length : ""} Items</Text>
      {props.signs ? displaySigns() : ""}
    </div>
  );
};

export default SignList;
