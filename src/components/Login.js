import React from 'react'
import { Button, Flex, Heading, Input, Icon } from "@chakra-ui/react"
import { MdSettings } from "react-icons/md"


const Login = () => {
  return (
    <div>
      <Flex height="50vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>
          <Input placeholder="Email" mb={6} type="email" />
          <Input placeholder="Password" mb={6} type="password" />
        </Flex>
      </Flex>
      
      <Icon as={MdSettings} />

    </div>
  )
}

export default Login

