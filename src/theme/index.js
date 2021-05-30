import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import {
  Fonts,
  FontSizes,
  FontWeights,
  LetterSpacings,
  LineHeights,
} from "./styles/fonts";

import Colors from "./styles/colors";

// Component style overrides
import Button from "./components/button";
import Heading from "./components/heading";
import Text from "./components/text";

const overrides = {
  fonts: Fonts,
  fontSizes: FontSizes,
  fontWeights: FontWeights,
  lineHeights: LineHeights,

  letterSpacings: LetterSpacings,
  colors: Colors,

  components: {
    Button,
    Heading,
    Text,
  },
};
export default extendTheme(overrides);
