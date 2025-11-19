import { useEffect, useState } from "react";
import ReservableList from "./ReservableList";
import group from "../../../assets/groupmeet.png";
import group2 from "../../../assets/groupmeet2.png";

const MeetingSpaceList = () => {
  const [spaces, setSpaces] = useState([]);

  const loading = false;

  // TODO: fetch meeting spaces from database once backend is implemented
  useEffect(() => {
    setSpaces([
      { id: 1, name: "Group Meeting", image: group },
      { id: 2, name: "Room Meeting", image: group2 },
    ]);
  }, []);

  return (
    <ReservableList
      items={spaces}
      loading={loading}
      reservableType="meetingSpace"
    />
  );
};
export default MeetingSpaceList;
