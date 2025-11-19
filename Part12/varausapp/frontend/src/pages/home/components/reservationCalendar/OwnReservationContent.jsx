import { useContext } from "react";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReservationCalendarContext } from "./ReservationCalendarContext";

const OwnReservationContent = ({ reservationId }) => {
  const { deleteReservation } = useContext(ReservationCalendarContext);

  return (
    <Flex justify="space-between" align="center" width="full">
      <Text fontSize="sm" color="white">
        Your reservation
      </Text>
      <Menu>
        <MenuButton
          as={IconButton}
          variant="ghost"
          color="white"
          _hover={{ background: "whiteAlpha.300" }}
          _active={{ background: "whiteAlpha.300" }}
          size="sm"
          icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
        />
        <MenuList>
          <MenuItem
            icon={<FontAwesomeIcon icon={faXmark} size="lg" />}
            color="danger.main"
            onClick={() => deleteReservation(reservationId)}
          >
            Cancel
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default OwnReservationContent;
