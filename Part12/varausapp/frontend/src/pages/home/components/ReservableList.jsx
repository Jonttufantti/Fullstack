import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "../../../contexts/AuthContext";
import ReservationCalendar from "./reservationCalendar/ReservationCalendar";
import ReservableListCard from "./ReservableListCard";
import { ReservationCalendarContextProvider } from "./reservationCalendar/ReservationCalendarContext";

/**
 * List of reservable items which are showns as cards that show, for example, an
 * image, name and a button which opens a modal from which the user can select a
 * date and time for the reservation. After the reservation has been created, a
 * confirmation modal is shown.
 *
 * Props:
 * - items: list of objects that have the following properties: id, name, image.
 * - loading: loading state of items
 * - reservableType: "computer" or "meetingSpace"
 */
const ReservableList = ({ items, loading, reservableType }) => {
  // TODO: show a skeleton UI while loading

  const [showReservationCalendar, setShowReservationCalendar] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const activeItem = items.find((item) => item.id === activeId);

  const handleOpen = (id) => {
    if (!user) {
      return navigate("/login");
    }

    setActiveId(id);
    setShowReservationCalendar(true);
  };

  const handleClose = () => {
    setShowReservationCalendar(false);
    setActiveId(null);
  };

  return (
    <>
      <ReservationCalendarContextProvider
        activeId={activeId}
        reservableType={reservableType}
      >
        <ReservationCalendar
          reservableName={activeItem?.name}
          show={showReservationCalendar}
          onClose={handleClose}
        />
      </ReservationCalendarContextProvider>
      {loading ? (
        "Loading..."
      ) : (
        <Flex as="ul" justify="center" wrap="wrap" gap="5" width="full">
          {items.map((item) => (
            <ReservableListCard
              key={item.id}
              item={item}
              onClick={handleOpen}
            />
          ))}
        </Flex>
      )}
    </>
  );
};
export default ReservableList;
