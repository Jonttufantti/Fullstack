import { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import TimeSlotTitlesColumn from "./TimeSlotTitlesColumn";
import DayColumn from "./DayColumn";

const TIME_SLOT_HEIGHT = { base: "3rem", lg: "2.5rem" };

const DayColumns = () => {
  const { shownDates } = useContext(ReservationCalendarContext);

  return (
    <Flex width="full">
      <TimeSlotTitlesColumn timeSlotHeight={TIME_SLOT_HEIGHT} />
      <Flex as="ul" width="full" flexGrow={1} listStyleType="none">
        {shownDates.map((date) => (
          <DayColumn key={date} date={date} timeSlotHeight={TIME_SLOT_HEIGHT} />
        ))}
      </Flex>
    </Flex>
  );
};

export default DayColumns;
