import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import computer from "../../../assets/smallcom.png";
import { useNotifications } from "../../../contexts/NotificationContext";
import computerReservationService from "../../../services/computerReservations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * Reservation list item showing the date and time and a button for cancelling
 * it.
 *
 * Props:
 * - reservation: object that has _id, date, startTime and endTime.
 * - setReservation: callback for setting reservations, used for deletion.
 * */
const MyReservation = ({ reservation, setReservations }) => {
  const { showToast } = useNotifications();

  const getDateText = () => {
    const date = new Date(reservation.date);

    const day = date.getDate();
    const monthName = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
  };

  const getTimeText = () => {
    const { startTime, endTime } = reservation;
    return `${startTime}–${endTime}`;
  };

  const handleDelete = async () => {
    const { conputerId, _id } = reservation;
    const response = await computerReservationService.remove(conputerId, _id);

    if (response.success) {
      setReservations((reservations) => {
        return reservations.filter((reservation) => reservation._id !== _id);
      });
      showToast({
        description: "Reservation deleted",
        status: "success",
      });
    } else {
      showToast({
        description: response.errorMessage,
        status: "error",
      });
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={{ base: "4", md: "8" }}
      width="full"
      padding={{ base: "4", md: "6" }}
      borderRadius="lg"
      background="shade.100"
    >
      <Flex width={{ base: "full", md: "initial" }} justify="space-between">
        <HStack gap="4">
          <Image
            src={computer}
            alt=""
            width={{ base: "30px", md: "80px" }}
            height={{ base: "30px", md: "80px" }}
          />
          <Heading as="h2" fontSize="xl">
            name here
          </Heading>
        </HStack>
        <Box display={{ base: "initial", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              color="black"
              _hover={{ background: "blackAlpha.200" }}
              _active={{ background: "blackAlpha.200" }}
              size="md"
              icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
            />
            <MenuList>
              <MenuItem
                icon={<FontAwesomeIcon icon={faXmark} size="lg" />}
                color="danger.main"
                onClick={handleDelete}
              >
                Cancel
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <HStack
        width={{ base: "full", md: "40%" }}
        maxWidth={{ base: "full", md: "lg" }}
        padding={{ base: "3", md: "5" }}
        borderRadius="lg"
        background="white"
        boxShadow="0px 0px 12px rgba(0, 0, 0, 0.08)"
      >
        <VStack align="flex-start" gap="1" width="50%">
          <Heading as="h3" fontSize="sm" color="shade.600">
            Date
          </Heading>
          <Text
            as="span"
            fontSize="xl"
            fontWeight="semibold"
            color="primary.main"
          >
            {getDateText()}
          </Text>
        </VStack>
        <VStack align="flex-start" gap="1" width="50%">
          <Heading as="h3" fontSize="sm" color="shade.600">
            Time
          </Heading>
          <Text
            as="span"
            fontSize="xl"
            fontWeight="semibold"
            color="primary.main"
          >
            {getTimeText()}
          </Text>
        </VStack>
      </HStack>
      <Button
        colorScheme="danger"
        size="lg"
        display={{ base: "none", md: "initial" }}
        onClick={handleDelete}
      >
        Cancel
      </Button>
    </Flex>
  );
};

export default MyReservation;
