import { popoverAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys);

const baseStyle = definePartsStyle({
  content: {
    borderRadius: "custom.large",
  },
});

export default defineMultiStyleConfig({ baseStyle });
