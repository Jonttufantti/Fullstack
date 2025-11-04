import { useState, useEffect } from "react";
import axios from "axios";
import diaryService from "../services/diaryService";
import type { NewDiaryEntry } from "../types";
import { Visibility, Weather } from "../types";

interface Props {
  onAdd: (entry: any) => void;
}

const DiaryForm = ({ onAdd }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(null), 4000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!weather || !visibility) {
      setError("Please select weather and visibility.");
      return;
    }

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

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
        <p style={{ color: "white", background: "red", padding: "0.5em" }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: "white", background: "green", padding: "0.5em" }}>
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
            required
          />
        </div>

        <div>
          visibility:{" "}
          {Object.values(Visibility).map((v) => (
            <label key={v} style={{ marginRight: "0.5em" }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />{" "}
              {v}
            </label>
          ))}
        </div>

        <div>
          weather:{" "}
          {Object.values(Weather).map((w) => (
            <label key={w} style={{ marginRight: "0.5em" }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />{" "}
              {w}
            </label>
          ))}
        </div>

        <div>
          comment:{" "}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
