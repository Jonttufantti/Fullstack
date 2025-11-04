import patientEntries from "../data/patients";
import { Patient, NonSensitiveEntry, NewPatientEntry } from "../types";
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

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
};
