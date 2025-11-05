import patientEntries from "../data/patients";
import {
  Patient,
  NonSensitiveEntry,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import { v4 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries: [],
    })
  );
};

const findById = (id: string): Patient | undefined => {
  const entry = patientEntries.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (
  patientId: string,
  entry: EntryWithoutId
): Entry | undefined => {
  const patient = patientEntries.find((p) => p.id === patientId);
  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
