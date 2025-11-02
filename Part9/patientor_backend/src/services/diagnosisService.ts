import diagnosisEntries from "../data/diagnoses";
import { Diagnosis, NonLatinEntry } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnosisEntries;
};

const getNonLatinEntries = (): NonLatinEntry[] => {
  return diagnosisEntries.map(({ code, name }) => ({
    code,
    name,
  }));
};

export default {
  getEntries,
  getNonLatinEntries,
};
