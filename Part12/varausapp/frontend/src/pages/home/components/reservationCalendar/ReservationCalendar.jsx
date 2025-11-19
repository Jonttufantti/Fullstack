import { useContext, useEffect } from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import WeekPicker from "./WeekPicker";
import DayPicker from "./DayPicker";
import DayColumns from "./DayColumns";
import {
  findDateFromDates,
  getCurrentOrNextWorkingDay,
  getCurrentOrNextWorkingWeek,
} from "../../../../utils/date";

/**
 * A modal containing a reservation calendar.
 */
const ReservationCalendar = ({ reservableName, show, onClose }) => {
  const {
    timeSlots,
    selectedDate,
    setSelectedDate,
    shownDates,
    setShownDates,
    selectedDateStartTimeSlotIndex,
    setSelectedDateStartTimeSlotIndex,
    selectedDateEndTimeSlotIndex,
    setSelectedDateEndTimeSlotIndex,
    createReservation,
  } = useContext(ReservationCalendarContext);

  const [isViewportLarge] = useMediaQuery("(min-width: 62em)", { ssr: false });

  useEffect(() => {
    if (isViewportLarge) {
      setShownDates((dates) => getCurrentOrNextWorkingWeek(dates[0]));
    } else {
      setShownDates((dates) => {
        const currentOrNextWorkingDayFromShownDates = findDateFromDates(
          getCurrentOrNextWorkingDay(),
          dates
        );
        if (currentOrNextWorkingDayFromShownDates) {
          return [currentOrNextWorkingDayFromShownDates];
        }
        return [getCurrentOrNextWorkingDay(dates[0])];
      });
    }
    setSelectedDate(null);
  }, [isViewportLarge]);

  const areRequiredSlotsSelected = () => {
    return selectedDateStartTimeSlotIndex !== null;
  };

  const resetState = () => {
    setSelectedDate(null);
    setSelectedDateStartTimeSlotIndex(null);
    setSelectedDateEndTimeSlotIndex(null);
  };

  const onDatesChange = () => {
    setSelectedDateStartTimeSlotIndex(null);
    setSelectedDateEndTimeSlotIndex(null);
  };

  const handleReserve = () => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = selectedDate.getDate();
    const date = `${year}-${month}-${day}`;

    const startTime = timeSlots[selectedDateStartTimeSlotIndex].start;
    let endTime = timeSlots[selectedDateStartTimeSlotIndex].end;

    if (selectedDateEndTimeSlotIndex !== null) {
      endTime = timeSlots[selectedDateEndTimeSlotIndex].end;
    }

    createReservation({ date, startTime, endTime });
    resetState();
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  return (
    <>
      <Modal
        size="maxWidth"
        isOpen={show}
        onClose={handleClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxWidth="8xl">
          <ModalHeader>
            <Heading
              as="h3"
              marginBottom={{ base: "5", xl: "7" }}
              fontSize={{ base: "2xl", xl: "3xl" }}
              color="shade.900"
            >
              {reservableName}
            </Heading>
            {shownDates.length > 1 ? (
              <WeekPicker onWeekChange={onDatesChange} />
            ) : (
              <DayPicker onDayChange={onDatesChange} />
            )}
          </ModalHeader>
          <ModalBody>
            <DayColumns />
          </ModalBody>
          <ModalFooter gap="5">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={handleReserve}
              isDisabled={!areRequiredSlotsSelected()}
            >
              Reserve Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReservationCalendar;
