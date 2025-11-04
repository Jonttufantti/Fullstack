import type { DiaryEntry } from "../types";

interface Props {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Diaries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
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

export default DiaryList;
