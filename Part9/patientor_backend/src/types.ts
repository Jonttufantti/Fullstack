import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(z.any()),
});

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;
export type NonSensitiveEntry = Omit<Patient, "ssn">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
