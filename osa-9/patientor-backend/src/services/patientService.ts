import patientData from "../../data/patients";

import { v1 as uuid } from "uuid";

const id = uuid();

import { Patient, PublicPatient, NewPatient } from "../types";

const patients: Patient[] = patientData;

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: id,
    ...entry,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPublicPatients,
  getPatientById,
};
