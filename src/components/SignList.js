//component imports
import React from "react";
import Sign from "./Sign";

//file imports
import { Heading, Text } from "@chakra-ui/react";

//this component will receive signs as props
const SignList = () => {
  return (
    <div>
      <Text>6 Items</Text>
      <Heading variant="normal" mb="2.5rem">
        Educators for PISD
      </Heading>
      <Sign />
      <Sign />
      <Sign />
    </div>
  );
};

export default SignList;
