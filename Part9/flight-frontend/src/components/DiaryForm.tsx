import { useState, useEffect } from "react";
import axios from "axios";
import diaryService from "../services/diaryService";
import type { NewDiaryEntry } from "../types";

interface Props {
  onAdd: (entry: any) => void;
}

const DiaryForm = ({ onAdd }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // auto-clear error messages
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // auto-clear success messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };

    try {
      const added = await diaryService.create(newEntry);
      onAdd(added);
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setError(null);
      setSuccess(`Diary added for ${added.date}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg =
          typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data);
        setError(msg);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Add new diary</h2>

      {error && (
        <p
          style={{
            color: "white",
            backgroundColor: "red",
            padding: "0.5em",
            borderRadius: "5px",
            maxWidth: "400px",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "white",
            backgroundColor: "green",
            padding: "0.5em",
            borderRadius: "5px",
            maxWidth: "400px",
          }}
        >
          {success}
        </p>
      )}

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
    </div>
  );
};

export default DiaryForm;
