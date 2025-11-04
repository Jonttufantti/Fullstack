import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { DiaryEntry } from "./types";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);

  const addDiary = (entry: DiaryEntry) => {
    setDiaries(diaries.concat(entry));
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm onAdd={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
