import { useContext } from "react";
import { Box, Heading, Skeleton, defineStyle } from "@chakra-ui/react";
import { isDateBeforeToday } from "../../../../utils/date";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import Reservation from "./Reservation";

/**
 * A column showing time slots and reservations of a day.
 *
 * Props:
 *  - date: date for the column.
 *  - timeSlotHeight: object that has base and lg properties (CSS).
 */
const DayColumn = ({ date, timeSlotHeight }) => {
  const {
    timeSlots,
    getReservationsForDate,
    reservationsLoading,
    selectedDate,
    setSelectedDate,
    selectedDateStartTimeSlotIndex,
    setSelectedDateStartTimeSlotIndex,
    selectedDateEndTimeSlotIndex,
    setSelectedDateEndTimeSlotIndex,
    shownDates,
  } = useContext(ReservationCalendarContext);

  const isBeforeToday = isDateBeforeToday(date);
  const reservations = getReservationsForDate(date);

  const getDayHeading = () => {
    const dayName = date.toLocaleString("en-GB", { weekday: "long" });
    return `${dayName}, ${date.getDate()}`;
  };

  const getReservedSlotIndices = () => {
    if (reservations.length === 0) {
      return [];
    }

    const reservedIndices = [];

    reservations.forEach((reservation) => {
      const startIndex = timeSlots.findIndex(
        (slot) => slot.start === reservation.startTime
      );
      const endIndex = timeSlots.findIndex(
        (slot) => slot.end === reservation.endTime
      );

      for (let i = startIndex; i <= endIndex; i++) {
        reservedIndices.push(i);
      }
    });

    return reservedIndices;
  };

  const handleSlotSelect = (index) => {
    // Select start time slot in another day column
    if (date !== selectedDate) {
      setSelectedDate(date);
      setSelectedDateStartTimeSlotIndex(index);
      setSelectedDateEndTimeSlotIndex(null);
      return;
    }

    // Select start time slot
    if (selectedDateStartTimeSlotIndex === null) {
      setSelectedDate(date);
      setSelectedDateStartTimeSlotIndex(index);
      return;
    }

    // Select start or end time slot
    if (selectedDateEndTimeSlotIndex === null) {
      if (index > selectedDateStartTimeSlotIndex) {
        setSelectedDateEndTimeSlotIndex(index);
      } else {
        setSelectedDateEndTimeSlotIndex(selectedDateStartTimeSlotIndex);
        setSelectedDateStartTimeSlotIndex(index);
      }
    }

    // Deselect start time slot and make end time slot new start time slot
    if (index === selectedDateStartTimeSlotIndex) {
      setSelectedDateStartTimeSlotIndex(selectedDateEndTimeSlotIndex);
      setSelectedDateEndTimeSlotIndex(null);
      return;
    }

    // Deselect end time slot
    if (index === selectedDateEndTimeSlotIndex) {
      setSelectedDateEndTimeSlotIndex(null);
      return;
    }
  };

  /**
   * Checks if the slot is start or end time slot, between them or in a
   * different day column
   * */
  const isSlotSelected = (index) => {
    if (date === selectedDate) {
      if (
        index === selectedDateStartTimeSlotIndex ||
        index === selectedDateEndTimeSlotIndex
      ) {
        return true;
      }

      if (
        selectedDateStartTimeSlotIndex !== null &&
        selectedDateEndTimeSlotIndex !== null
      ) {
        return (
          index > selectedDateStartTimeSlotIndex &&
          selectedDateEndTimeSlotIndex > index
        );
      }
    }

    return false;
  };

  /**
   * Finds the min and max possible end slot indices based on
   * selectedDateStartTimeSlotIndex to prevent selecting a non-continuous range
   * (range that contains reservations).
   * */
  const findSelectableMinAndMaxEndSlotIndices = () => {
    const sortedReservedSlotIndices = getReservedSlotIndices().sort(
      (a, b) => a - b
    );
    let minFreeIndex = 0;
    let maxFreeIndex = timeSlots.length;

    for (const reservedIndex of sortedReservedSlotIndices) {
      if (reservedIndex < selectedDateStartTimeSlotIndex) {
        minFreeIndex = reservedIndex + 1;
      } else {
        maxFreeIndex = reservedIndex - 1;
        break;
      }
    }

    return [minFreeIndex, maxFreeIndex];
  };

  /**
   * The slot is disabled if it contains a reservation, is between start or end
   * time slot, or if selecting it would form to a non-continuous range.
   */
  const isSlotDisabled = (index) => {
    if (getReservedSlotIndices().includes(index)) {
      return true;
    }

    if (date === selectedDate) {
      if (selectedDateStartTimeSlotIndex !== null) {
        const [minPossible, maxPossible] =
          findSelectableMinAndMaxEndSlotIndices();
        if (index < minPossible || index > maxPossible) {
          return true;
        }
      }

      if (selectedDateEndTimeSlotIndex !== null) {
        if (
          index !== selectedDateStartTimeSlotIndex &&
          index !== selectedDateEndTimeSlotIndex
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const isSlotReserved = (index) => {
    return getReservedSlotIndices().includes(index);
  };

  const getButtonStyle = (index) => {
    const isSelected = isSlotSelected(index);
    const isDisabled = isSlotDisabled(index);
    const isReserved = isSlotReserved(index);

    return defineStyle({
      width: "full",
      height: "full",
      background: isSelected ? "#505AB8" : "transparent",
      cursor: isDisabled ? "default" : "pointer",
      opacity: isDisabled && !isReserved ? 0.5 : 1,
    });
  };

  return (
    <Box as="li" width="full">
      {shownDates.length > 1 && (
        <Box height="10" paddingLeft="2.5">
          <Heading
            as="h5"
            fontSize="lg"
            color={isBeforeToday ? "shade.500" : "initial"}
          >
            {getDayHeading()}
          </Heading>
        </Box>
      )}
      <Skeleton isLoaded={!reservationsLoading} fadeDuration={0}>
        <Box position="relative" width="full">
          {!isBeforeToday && (
            <Box
              position="absolute"
              as="ul"
              width="full"
              height="full"
              listStyleType="none"
              pointerEvents="none"
            >
              {reservations.map((reservation) => (
                <Reservation
                  key={reservation._id}
                  reservation={reservation}
                  timeSlotHeight={timeSlotHeight}
                />
              ))}
            </Box>
          )}
          <Box
            as="ul"
            width="full"
            listStyleType="none"
            background={isBeforeToday ? "shade.200" : "transparent"}
          >
            {timeSlots.map((slot, index) => (
              <Box
                as="li"
                key={slot.start}
                width="full"
                height={timeSlotHeight}
                paddingRight="3px"
                paddingLeft="1px"
                borderColor="shade.600"
                borderWidth="1px 1px 0 0"
                _last={{ borderBottomWidth: "1px" }}
              >
                {!isBeforeToday && (
                  <Box
                    as="button"
                    display="block"
                    {...getButtonStyle(index)}
                    onClick={() => handleSlotSelect(index)}
                    disabled={isSlotDisabled(index)}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Skeleton>
    </Box>
  );
};

export default DayColumn;
