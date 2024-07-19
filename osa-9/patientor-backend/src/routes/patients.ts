import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  try {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
  res.send("Saving a patient!");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const patient = patientService.getPatientById(id);
    res.json(patient);
  } catch (error: any) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
