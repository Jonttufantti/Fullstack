export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinEntry = Omit<Diagnosis, "latin">;
