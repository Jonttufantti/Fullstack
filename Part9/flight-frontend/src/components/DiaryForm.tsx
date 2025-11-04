import { useState } from "react";
import type { NewDiaryEntry } from "../types";
import diaryService from "../services/diaryService";

interface Props {
  onAdd: (entry: any) => void;
}

const DiaryForm = ({ onAdd }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };

    const added = await diaryService.create(newEntry);
    onAdd(added);

    // reset form
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        date:{" "}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        weather:{" "}
        <input value={weather} onChange={(e) => setWeather(e.target.value)} />
      </div>
      <div>
        visibility:{" "}
        <input
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
      </div>
      <div>
        comment:{" "}
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
