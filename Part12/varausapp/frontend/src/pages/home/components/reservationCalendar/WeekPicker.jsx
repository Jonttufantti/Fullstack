import { useContext } from "react";
import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import CalendarNavigationButton from "./CalendarNavigationButton";
import getISOWeek from "date-fns/getISOWeek";
import {
  findDateFromDates,
  getCurrentOrNextWorkingDay,
  getNextWorkingWeek,
  getPreviousWorkingWeek,
} from "../../../../utils/date";
import DatePickerPopover from "./DatePickerPopover";

/**
 * A picker that allows navigating to the next or previous week and selecting a
 * specific week from a calendar popover.
 *
 * This is meant to be used for large screens.
 * */
const WeekPicker = ({ onWeekChange }) => {
  const { shownDates, setShownDates } = useContext(ReservationCalendarContext);

  // The length of shown dates depends on viewport width and is set using
  // useEffect. This happens in the wrong order, so prevent an error by
  // returning null if shownDates doesn't contain whole week.
  if (shownDates.length < 5) {
    return null;
  }

  const getHeading = () => {
    const startDate = shownDates[0];
    const endDate = shownDates[4];
    const startNumber = startDate.getDate();
    const endNumber = endDate.getDate();
    const startMonthName = startDate.toLocaleString("en-GB", { month: "long" });
    const endMonthName = endDate.toLocaleString("en-GB", { month: "long" });
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startYear !== endYear) {
      return `${startNumber} ${startMonthName} ${startYear} – ${endNumber} ${endMonthName} ${endYear}`;
    }

    if (startMonthName === endMonthName) {
      return `${startNumber}–${endNumber} ${endMonthName} ${startYear}`;
    }

    return `${startNumber} ${startMonthName} – ${endNumber} ${endMonthName} ${startYear}`;
  };

  const getWeekText = () => {
    return `Week ${getISOWeek(shownDates[0])}`;
  };

  const handlePreviousClick = () => {
    setShownDates(getPreviousWorkingWeek(shownDates[0]));
    onWeekChange();
  };

  const handleNextClick = () => {
    setShownDates(getNextWorkingWeek(shownDates[0]));
    onWeekChange();
  };

  const canGoBack = () => {
    return !!findDateFromDates(getCurrentOrNextWorkingDay(), shownDates);
  };

  return (
    <HStack align="center" spacing="5">
      <HStack spacing="2.5">
        <CalendarNavigationButton
          direction="previous"
          onClick={handlePreviousClick}
          isDisabled={canGoBack()}
        />
        <CalendarNavigationButton direction="next" onClick={handleNextClick} />
      </HStack>
      <DatePickerPopover
        buttonContent={
          <VStack align="flex-start" spacing="2.5">
            <Heading as="h4" fontSize={{ base: "lg", xl: "xl" }}>
              {getHeading()}
            </Heading>
            <Text
              fontSize={{ base: "sm", xl: "lg" }}
              lineHeight="1em"
              fontWeight="normal"
              color="shade.900"
            >
              {getWeekText()}
            </Text>
          </VStack>
        }
      />
    </HStack>
  );
};

export default WeekPicker;
