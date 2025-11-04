import { z } from "zod";

export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinEntry = Omit<Diagnosis, "latin">;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string(),
  entries: z.array(z.any()),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitiveEntry = Omit<Patient, "ssn">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
