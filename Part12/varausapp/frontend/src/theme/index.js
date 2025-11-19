import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import radii from "./foundations/radii";
import Button from "./components/button";
import Card from "./components/card";
import Heading from "./components/heading";
import IconButton from "./components/iconButton";
import Modal from "./components/modal";
import Popover from "./components/popover";

const overrides = {
  styles,
  colors,
  fonts,
  radii,
  components: {
    Button,
    Card,
    Heading,
    IconButton,
    Modal,
    Popover,
  },
};

export default extendTheme(overrides);
