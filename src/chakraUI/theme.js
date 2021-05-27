import { extendTheme } from "@chakra-ui/react";
// theme.js
const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  fontSizes: {
    xl: "9rem",
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
    gray: {
      100: "#C4C4C4",
      200: "#E3E3E3",
    },
  },

  components: {
    Heading: {
      baseStyle: {
        fontWeight: "semibold",
        letterSpacing: "0.1rem",
        color: "black",
        
      },
      variants: {
        jumbo: {
          fontWeight: "extrabold",
          fontSize: "10vw",
          letterSpacing: "0.2rem",
        },
        normal: {
          fontSize: "5vw",
        },
      },
    },
    // Input: {
    //   baseStyle: {
    //     focusBorderColor: "gray",
    //   },
    //   variants: {
    //     normal: {
    //       focusBorderColor: "lime",
    //     },
    //   },
    // },
    Button: {
      variants: {
        main: {
          bg: "gray",
          boxShadow: "0 0 2px 2px #efdfde",
        },
      },
    },
  },
});

export default theme;
