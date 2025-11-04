import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: 0 | 1 | 2 | 3;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NonLatinEntry = Omit<Diagnosis, "latin">;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(z.any()),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitiveEntry = Omit<Patient, "ssn">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
