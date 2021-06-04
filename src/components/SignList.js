//component imports
import React, { Component, useEffect, useState } from "react";
import Sign from "./Sign";

//file imports
import { Heading, Text } from "@chakra-ui/react";

//this component receives signs as props
//TODO: this component needs campaign as props
const SignList = (props) => {
  const displaySigns = () =>
    props.signs.map((sign, idx) => {
      return <div key={idx}>{<Sign title={sign.latitude} imageSrc={sign.image} />}</div>;
    });

  return (
    <div>
      <Text>{props.signs ? props.signs.length : ""} Items</Text>
      <Heading variant="normal" mb="2.5rem">
        Educators for PISD
      </Heading>
      {props.signs ? displaySigns() : ""}
    </div>
  );
};

export default SignList;
