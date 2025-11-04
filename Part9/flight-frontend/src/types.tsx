export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
