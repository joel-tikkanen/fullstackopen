import { Diagnosis } from "../types";

import data from "../../data/diagnoses";

const diagnoses: Diagnosis[] = data;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};