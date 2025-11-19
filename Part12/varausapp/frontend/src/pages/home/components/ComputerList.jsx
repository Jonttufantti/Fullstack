import { useEffect, useState } from "react";
import ReservableList from "./ReservableList";
import computerImage from "../../../assets/computer.png";
import ComputerService from "../../../services/computers";

const ComputerList = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);

  const listItems = computers.map((computer) => {
    return { ...computer, id: computer._id, image: computerImage };
  });

  useEffect(() => {
    const fetchComputers = async () => {
      const { data } = await ComputerService.getAll();
      // TODO: show an error message using NotificationContext if computers
      // can't be loaded.
      if (data) {
        setComputers(data);
      }
      setLoading(false);
    };
    fetchComputers();
  }, []);

  return (
    <ReservableList
      items={listItems}
      loading={loading}
      reservableType="computer"
    />
  );
};
export default ComputerList;
