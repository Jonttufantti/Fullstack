import { useContext, useState } from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import DatePicker from "./DatePicker";
import { ReservationCalendarContext } from "./ReservationCalendarContext";
import {
  getCurrentOrNextWorkingDay,
  getCurrentOrNextWorkingWeek,
} from "../../../../utils/date";

const DatePickerPopover = ({ buttonContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { shownDates, setShownDates } = useContext(ReservationCalendarContext);

  const handleChange = (date) => {
    if (shownDates.length > 1) {
      setShownDates(getCurrentOrNextWorkingWeek(date));
    } else {
      setShownDates([getCurrentOrNextWorkingDay(date)]);
    }
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button
          variant="ghost"
          width="fit-content"
          height="fit-content"
          padding="2"
          borderRadius="xl"
          color="black"
        >
          {buttonContent}
        </Button>
      </PopoverTrigger>
      <PopoverContent width="85vw" maxWidth="sm" padding="1.5">
        <PopoverArrow />
        <PopoverBody>
          <DatePicker onChange={handleChange} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerPopover;
