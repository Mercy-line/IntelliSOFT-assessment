import mongoose from "mongoose";
import Assessment from "../models/Assessment.js";
import Patient from "../models/Patient.js";

/**
 * @desc    Create new assessment for a patient
 * @route   POST /api/assessments
 */
export const createAssessment = async (req, res) => {
  try {
    const { patientId, healthStatus, onDiet, onDrugs, visitDate } = req.body;

    // Ensure patient exists
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // Create assessment
    const assessment = await Assessment.create({
      patient: patient._id,
      healthStatus,
      onDiet,
      onDrugs,
      visitDate
      // BMI logic handled in pre-save hook
    });

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: assessment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get all assessments
 * @route   GET /api/assessments
 */
export const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .populate("patient", "patientId firstName lastName gender");

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get all assessments for a specific patient
 * @route   GET /api/assessments/patient/:patientId
 */
export const getAssessmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    const assessments = await Assessment.find({ patient: patient._id })
      .sort({ visitDate: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update an assessment by ID
 * @route   PUT /api/assessments/:id
 */
export const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assessment ID"
      });
    }

    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }

    // Update fields if provided
    if (req.body.healthStatus) assessment.healthStatus = req.body.healthStatus;
    if (req.body.visitDate) assessment.visitDate = req.body.visitDate;
    if (req.body.onDiet) assessment.onDiet = req.body.onDiet;
    if (req.body.onDrugs) assessment.onDrugs = req.body.onDrugs;

    // Save triggers pre-save hook for BMI-based logic
    await assessment.save();

    res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: assessment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Delete an assessment by ID
 * @route   DELETE /api/assessments/:id
 */
export const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assessment ID"
      });
    }

    const assessment = await Assessment.findByIdAndDelete(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Assessment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
