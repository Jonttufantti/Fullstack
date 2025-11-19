import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB";
import "./datePicker.css";

const DatePicker = ({ onChange }) => {
  const filterDate = (date) => {
    // Disable weekends
    if (date.getDay() === 6 || date.getDay() === 0) {
      return false;
    }
    // Disable all previous dates
    return date >= new Date(new Date().setHours(0, 0, 0, 0));
  };

  return (
    <ReactDatePicker
      onChange={(date) => {
        onChange(date);
      }}
      filterDate={filterDate}
      minDate={new Date()}
      inline={true}
      locale={enGB}
    />
  );
};

export default DatePicker;
