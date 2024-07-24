import { useState, useEffect } from "react";

import { Button } from "@mui/material";

import { useParams } from "react-router-dom";

import patientService from "../services/patients";

import { Entry, Patient } from "../types";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(id!);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div key={entry.id}>
            <p>date: {entry.date}</p>
            <p>type: {entry.type}</p>
            <p>description: {entry.description}</p>
            <p>health check rating: {entry.healthCheckRating}</p>
            <p>specialist: {entry.specialist}</p>
            {entry.diagnosisCodes && (
              <div>
                <p>diagnosis codes:</p>
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case "Hospital":
        return (
          <div key={entry.id}>
            <p>date: {entry.date}</p>
            <p>type: {entry.type}</p>
            <p>description: {entry.description}</p>
            <p>specialist: {entry.specialist}</p>
            <p>discharge date: {entry.discharge.date}</p>
            <p>discharge criteria: {entry.discharge.criteria}</p>
            {entry.diagnosisCodes && (
              <div>
                <p>diagnosis codes:</p>
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div key={entry.id}>
             <p>date: {entry.date}</p>
            <p>type: {entry.type}</p>
            <p>description: {entry.description}</p>
            <p>specialist: {entry.specialist}</p>
            <p>employer name: {entry.employerName}</p>
            {entry.sickLeave && (
              <div>
                <p>sick leave start date: {entry.sickLeave.startDate}</p>
                <p>sick leave end date: {entry.sickLeave.endDate}</p>
              </div>
            )}
            {entry.diagnosisCodes && (
              <div>
                <p>diagnosis codes:</p>
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
    }
  };

  if (patient) {
    return (
      <div>
        <Button title="HOME" href="/" />
        <h2>{patient.name}</h2>
        <p>gender: {patient.gender}</p>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <br/>
        <h3>entries</h3>
        {patient.entries.length > 0 ? (
          patient.entries.map((entry) => (
            <div key={entry.id}>
              {renderEntryDetails(entry)}
            </div>
          ))
        ) : (
          <p>no entries found</p>
        )}
      </div>
    );
  }
  return (
    <div>
      <Button title="HOME" href="/" />
      <h3>patient not found</h3>
    </div>
  );
};

export default PatientDetails;
