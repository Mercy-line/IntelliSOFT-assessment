import express from "express";
import {
  createAssessment,
  getAllAssessments,
  getAssessmentsByPatient,
  updateAssessment,
  deleteAssessment
} from "../controllers/assessmentController.js";

const router = express.Router();

// Create a new assessment
router.post("/", createAssessment);

// Get all assessments
router.get("/", getAllAssessments);

// Get assessments for a specific patient by patientId
router.get("/patient/:patientId", getAssessmentsByPatient);

// Update an assessment by ID
router.put("/:id", updateAssessment);

// Delete an assessment by ID
router.delete("/:id", deleteAssessment);

export default router;
