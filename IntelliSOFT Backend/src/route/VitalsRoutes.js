import express from "express";
import {
  createVitals,
  getAllVitals,
  getVitalsByPatient,
  updateVitals,
  deleteVitals
} from "../controllers/vitalsController.js";

const router = express.Router();

// Create a new vitals record
router.post("/", createVitals);

// Get all vitals records
router.get("/", getAllVitals);

// Get vitals for a specific patient by patientId
router.get("/patient/:patientId", getVitalsByPatient);

// Update a vitals record by ID
router.put("/:id", updateVitals);

// Delete a vitals record by ID
router.delete("/:id", deleteVitals);

export default router;
