import { extendTheme } from "@chakra-ui/react";
// theme.js
const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  fontSizes: {
    lg: "18px",
  },
  colors: {
    blue: {
      100: "#C4DEFC",
      200: "#67A9F6",
      300: "#0875F5",
    },
    eggshell: "#E5E5E5",
    white: "#FFFFFF",
    black: "#000000",
    gray: "#C4C4C4",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
      },
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      variants: {
        "with-shadowyow": {
          bg: "red.400",
          boxShadow: "0 0 2px 2px #efdfde",
        },
      }
    }
  }
});

export default theme;
