import { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import OwnReservationContent from "./OwnReservationContent";
import OthersReservationContent from "./OthersReservationContent";

/**
 * A component that shows a reservation over the time slots.
 *
 * If the reservation is the user's own, a menu from which the reservation can
 * be deleted is also shown in the component.
 *
 * Props:
 * - reservation: object that has _id, userId, startTime and endTime.
 * - timeSlotHeight: object that has base and lg properties (CSS).
 */
const Reservation = ({ reservation, timeSlotHeight }) => {
  const { shownDates, timeSlots } = useContext(ReservationCalendarContext);
  const { user } = useContext(AuthContext);
  const isOwnReservation = user.id === reservation.userId;

  const getPositionMultiplier = () => {
    return timeSlots.map((slot) => slot.start).indexOf(reservation.startTime);
  };

  const getStartAndEndIndex = () => {
    const startSlotIndex = timeSlots
      .map((slot) => slot.start)
      .indexOf(reservation.startTime);
    const endSlotIndex = timeSlots
      .map((slot) => slot.end)
      .indexOf(reservation.endTime);

    return [startSlotIndex, endSlotIndex];
  };

  const getHeightMultiplier = () => {
    const [startSlotIndex, endSlotIndex] = getStartAndEndIndex();
    return endSlotIndex - startSlotIndex + 1;
  };

  const isMultiSlot = () => {
    const [startSlotIndex, endSlotIndex] = getStartAndEndIndex();
    return startSlotIndex !== endSlotIndex;
  };

  return (
    <Flex
      as="li"
      align={isMultiSlot() ? "flex-start" : "center"}
      position="absolute"
      top={{
        base: `calc(${timeSlotHeight.base} * ${getPositionMultiplier()})`,
        lg: `calc(${timeSlotHeight.lg} * ${getPositionMultiplier()})`,
      }}
      // Leave some gap between reservations on different days
      width={shownDates.length > 1 ? "calc(100% - 4px)" : "full"}
      // Leave some gap between reservations on same day
      height={{
        base: `calc(${timeSlotHeight.base} * ${getHeightMultiplier()} - 4px)`,
        lg: `calc(${timeSlotHeight.lg} * ${getHeightMultiplier()} - 4px)`,
      }}
      padding={isOwnReservation && !isMultiSlot() ? 0 : "2.5"}
      paddingLeft="2.5"
      paddingRight="2"
      background={isOwnReservation ? "primary.main" : "danger.main"}
      pointerEvents="initial"
    >
      {isOwnReservation ? (
        <OwnReservationContent reservationId={reservation._id} />
      ) : (
        <OthersReservationContent />
      )}
    </Flex>
  );
};

export default Reservation;
