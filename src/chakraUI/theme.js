import { extendTheme } from "@chakra-ui/react";
// theme.js
const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
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
      100: "#C4C4C4", //medium
      200: "#E3E3E3", //lightest
      300: "#4E4F67", //darkest
    },
  },

  components: {
    Heading: {
      baseStyle: {
        fontWeight: "semibold",
        
        color: "black",
      },
      variants: {
        jumbo: {
          fontWeight: "extrabold",
          fontSize: "9xl",
          letterSpacing: "0.2rem",
        },
        normal: {
          fontSize: "5xl",
          letterSpacing: "0.1rem",
        },
        sub: {
          fontSize: "xl",
          fontWeight: "semibold",
          color: "gray.300",
        }
      },
    },
    Text: {
      variants: {
        minor: {
          fontSize: "xs",
          color: "gray.300",
        },
      }
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
