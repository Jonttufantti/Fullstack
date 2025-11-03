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

export type NonLatinEntry = Omit<Diagnosis, "latin">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type NonSensitiveEntry = Omit<Patient, "ssn">;
