import { Router } from "express";

const router=Router();


import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";



// Create patient
router.post("/", createPatient);

// Get all patients
router.get("/", getPatients);

// Get single patient
router.get("/:id", getPatientById);

// Update patient
router.put("/:id", updatePatient);

// Delete patient
router.delete("/:id", deletePatient);

export default router;