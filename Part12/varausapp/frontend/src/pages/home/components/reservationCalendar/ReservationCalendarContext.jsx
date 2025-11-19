import { createContext, useCallback, useEffect, useState } from "react";
import { useNotifications } from "../../../../contexts/NotificationContext";
import { getCurrentOrNextWorkingWeek } from "../../../../utils/date";
import computerReservationService from "../../../../services/computerReservations";

const TIME_SLOTS = [
  { start: "7", end: "8" },
  { start: "8", end: "9" },
  { start: "9", end: "10" },
  { start: "10", end: "11" },
  { start: "11", end: "12" },
  { start: "12", end: "13" },
  { start: "13", end: "14" },
  { start: "14", end: "15" },
  { start: "15", end: "16" },
  { start: "16", end: "17" },
  { start: "17", end: "18" },
  { start: "18", end: "19" },
];

/**
 * reservations: array of objects including date (string), startDate (string)
 * and endDate (string).
 */
export const ReservationCalendarContext = createContext({
  timeSlots: TIME_SLOTS,
  reservations: [],
  reservationsLoading: false,
  /** The length of shownDates is 1 or 5, depending on the viewport width. */
  shownDates: getCurrentOrNextWorkingWeek(),
  setShownDates: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  selectedDateStartTimeSlotIndex: null,
  setSelectedDateStartTimeSlotIndex: () => {},
  selectedDateEndTimeSlotIndex: null,
  setSelectedDateEndTimeSlotIndex: () => {},
  getReservationsForDate: () => {},
  createReservation: async ({ date, startTime, endTime }) => {
    date, startTime, endTime;
  },
  deleteReservation: async (id) => {
    id;
  },
});

/**
 * Context for the reservation calendar.
 *
 * Props:
 * - activeId: ID of the active item.
 * - reservableType: "computer", other types are not supported yet.
 */
export const ReservationCalendarContextProvider = ({
  activeId,
  reservableType,
  children,
}) => {
  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [shownDates, setShownDates] = useState(getCurrentOrNextWorkingWeek);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateStartTimeSlotIndex, setSelectedDateStartTimeSlotIndex] =
    useState(null);
  const [selectedDateEndTimeSlotIndex, setSelectedDateEndTimeSlotIndex] =
    useState(null);

  const { showToast } = useNotifications();

  const fetchReservations = useCallback(async () => {
    setReservationsLoading(true);

    let fetchedReservations = null;

    if (reservableType === "computer") {
      const { data } = await computerReservationService.getAllForComputer(
        activeId
      );
      fetchedReservations = data;
    }

    if (fetchedReservations) {
      setReservations(fetchedReservations);
      setReservationsLoading(false);
    } else {
      showToast({
        description: "Reservations could not be loaded",
        status: "error",
      });
      setReservations([]);
    }
  }, [reservableType, activeId, showToast]);

  useEffect(() => {
    if (activeId) {
      fetchReservations();
    } else {
      setReservations([]);
    }
  }, [activeId, fetchReservations]);

  const getReservationsForDate = (date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setHours(0, 0, 0, 0);
    return reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date);
      reservationDate.setHours(0, 0, 0, 0);
      return reservationDate.getTime() === dateCopy.getTime();
    });
  };

  const createReservation = async ({ date, startTime, endTime }) => {
    let response = null;

    if (reservableType === "computer") {
      response = await computerReservationService.create(activeId, {
        date,
        startTime,
        endTime,
      });
    }

    if (response.data) {
      setReservations(reservations.concat(response.data));
      showToast({
        description: "Reservation created",
        status: "success",
      });
    } else {
      showToast({
        description: response.errorData.message,
        status: "error",
      });
    }
  };

  const deleteReservation = async (id) => {
    let response = null;

    if (reservableType === "computer") {
      response = await computerReservationService.remove(activeId, id);
    }

    if (response.success) {
      const filtered = reservations.filter(
        (reservation) => reservation._id !== id
      );
      setReservations(filtered);
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
    <ReservationCalendarContext.Provider
      value={{
        timeSlots: TIME_SLOTS,
        reservations,
        reservationsLoading,
        shownDates,
        setShownDates,
        selectedDate,
        setSelectedDate,
        selectedDateStartTimeSlotIndex,
        setSelectedDateStartTimeSlotIndex,
        selectedDateEndTimeSlotIndex,
        setSelectedDateEndTimeSlotIndex,
        getReservationsForDate,
        createReservation,
        deleteReservation,
      }}
    >
      {children}
    </ReservationCalendarContext.Provider>
  );
};
