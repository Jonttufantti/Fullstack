import patientEntries from "../data/patients";
import { Patient, NonSensitiveEntry } from "../types";

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

export default {
  getEntries,
  getNonSensitiveEntries,
};
