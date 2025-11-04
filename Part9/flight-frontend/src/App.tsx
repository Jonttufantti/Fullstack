import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaryService";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map((d) => (
        <div key={d.id} style={{ marginBottom: "1rem" }}>
          <h3>{d.date}</h3>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
          {d.comment && (
            <p>
              <i>{d.comment}</i>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
