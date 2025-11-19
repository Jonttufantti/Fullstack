import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@chakra-ui/react";

/**
 * Round button for navigation.
 *
 * Props:
 * - direction: "next" or "previous"
 * - isDisabled: disabled state
 */
const CalendarNavigationButton = ({ direction, isDisabled, ...rest }) => {
  return (
    <IconButton variant="outline" isDisabled={isDisabled} {...rest}>
      {direction === "next" ? (
        <FontAwesomeIcon icon={faChevronRight} />
      ) : (
        <FontAwesomeIcon icon={faChevronLeft} />
      )}
    </IconButton>
  );
};

export default CalendarNavigationButton;
