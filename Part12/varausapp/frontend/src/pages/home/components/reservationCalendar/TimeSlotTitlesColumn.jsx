import { useContext } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import { ReservationCalendarContext } from "./ReservationCalendarContext";

/** timeSlotHeight: object that has base and lg properties (CSS). */
const TimeSlotTitlesColumn = ({ timeSlotHeight }) => {
  const { shownDates, timeSlots } = useContext(ReservationCalendarContext);

  const times = timeSlots.map((slot) => `${slot.start}.00`);

  return (
    <VStack
      as="ul"
      spacing={0}
      flexShrink={0}
      width="14"
      marginTop={shownDates.length > 1 ? "10" : "inital"}
    >
      {times.map((time) => (
        <Flex
          as="li"
          key={time}
          align="start"
          justify="flex-end"
          width="full"
          height={timeSlotHeight}
          padding="2.5"
          borderColor="shade.600"
          borderWidth="1px 1px 0 0"
          fontSize="sm"
          lineHeight="1em"
          fontWeight="normal"
          _last={{ borderBottomWidth: "1px" }}
        >
          {time}
        </Flex>
      ))}
    </VStack>
  );
};

export default TimeSlotTitlesColumn;
