
import { Button, Flex, Heading, Input, Icon, useColorMode, IconButton } from "@chakra-ui/react"
import { BiSun, BiMoon } from "react-icons/bi"

const DarkModeSwitch = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  return (
    <IconButton aria-label="Toggle Dark Switch"
    icon={colorMode === "dark" ? <Icon as={BiSun} /> : <Icon as={BiMoon} />}
    onClick={toggleColorMode} />

  )
}

export default DarkModeSwitch