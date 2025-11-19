import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { defineStyle } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  header: {
    padding: "5",
    fontSize: "2xl",
  },
  dialogContainer: {
    padding: "5",
  },
  dialog: {
    maxHeight: "100%",
    margin: 0,
    borderRadius: "custom.large",
  },
  closeButton: {
    top: "5",
    right: "5",
    width: "8",
    height: "8",
    borderRadius: "full",
    border: "1px solid ",
    borderWidth: "1px",
    borderColor: "shade.300",
    backgroundColor: "shade.100",
    color: "#03053D",
    _hover: {
      backgroundColor: "shade.300",
    },
    _active: {
      backgroundColor: "shade.300",
    },
  },
  body: {
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: "5",
    paddingRight: "5",
  },
  footer: {
    padding: "5",
  },
});

const largeDialog = defineStyle({
  borderRadius: { base: "custom.large", lg: "custom.larger" },
});

const largeCloseButton = defineStyle({
  top: { base: "5", lg: "10" },
  right: { base: "5", lg: "10" },
  width: { base: "8", lg: "10" },
  height: { base: "8", lg: "10" },
});

const largeHeader = defineStyle({
  padding: { base: "5", lg: "10" },
  paddingBottom: { base: "5", lg: "7" },
  fontSize: { base: "2xl", lg: "3xl" },
});

const largeBody = defineStyle({
  paddingLeft: { base: "5", lg: "10" },
  paddingRight: { base: "5", lg: "10" },
});

const largeFooter = defineStyle({
  padding: { base: "5", lg: "10" },
  paddingTop: { base: "5", lg: "7" },
});

const defaultLargeConfig = {
  header: largeHeader,
  dialog: largeDialog,
  closeButton: largeCloseButton,
  body: largeBody,
  footer: largeFooter,
};

const sizes = {
  "4xl": defineMultiStyleConfig({
    ...defaultLargeConfig,
  }),
  "5xl": defineMultiStyleConfig({
    ...defaultLargeConfig,
  }),
  "6xl": defineMultiStyleConfig({
    ...defaultLargeConfig,
  }),
  full: defineMultiStyleConfig({
    ...defaultLargeConfig,
    dialog: { ...largeDialog, borderRadius: "none" },
    dialogContainer: {
      padding: "0",
    },
  }),
  maxWidth: defineMultiStyleConfig({
    ...defaultLargeConfig,
    dialog: {
      ...largeDialog,
      maxWidth: { base: "100%", sm: "100%" },
    },
  }),
};

export default defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    isCentered: true,
  },
});
