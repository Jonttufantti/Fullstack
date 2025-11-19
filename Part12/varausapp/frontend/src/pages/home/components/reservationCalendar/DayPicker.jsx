import { useContext } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import CalendarNavigationButton from "./CalendarNavigationButton";
import {
  findDateFromDates,
  getCurrentOrNextWorkingDay,
  getNextWorkingDay,
  getPrevioustWorkingDay,
} from "../../../../utils/date";
import DatePickerPopover from "./DatePickerPopover";

/**
 * A picker that allows navigating to the next or previous date and selecting a
 * specific date from a calendar popover.
 *
 * This is meant to be used for small screens.
 * */
const DayPicker = ({ onDayChange }) => {
  const { shownDates, setShownDates } = useContext(ReservationCalendarContext);

  const getHeading = () => {
    return shownDates[0].toLocaleString("en-GB", { weekday: "long" });
  };

  const getDateText = () => {
    const date = shownDates[0];
    const dayNumber = date.getDate();
    const monthName = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    return `${dayNumber} ${monthName} ${year}`;
  };

  const handleNextClick = () => {
    setShownDates([getNextWorkingDay(shownDates[0])]);
    onDayChange();
  };

  const handlePreviousClick = () => {
    setShownDates([getPrevioustWorkingDay(shownDates[0])]);
    onDayChange();
  };

  const canGoBack = () => {
    return !!findDateFromDates(getCurrentOrNextWorkingDay(), shownDates);
  };

  return (
    <Flex align="center" width="full" justify="space-between">
      <CalendarNavigationButton
        direction="previous"
        onClick={handlePreviousClick}
        isDisabled={canGoBack()}
      />
      <DatePickerPopover
        buttonContent={
          <Flex direction="column" align="center" gap="2.5">
            <Heading as="h4" fontSize="lg">
              {getHeading()}
            </Heading>
            <Text
              fontSize="sm"
              lineHeight="1em"
              fontWeight="normal"
              color="shade.900"
            >
              {getDateText()}
            </Text>
          </Flex>
        }
      />
      <CalendarNavigationButton direction="next" onClick={handleNextClick} />
    </Flex>
  );
};

export default DayPicker;
