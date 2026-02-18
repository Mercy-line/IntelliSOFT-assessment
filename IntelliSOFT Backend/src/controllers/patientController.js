import mongoose from "mongoose";
import Patient from "../models/Patient.js";

/**
 * @desc    Create new patient
 * @route   POST /api/patients
 */
export const createPatient = async (req, res) => {
  try {
    const { firstName, lastName, gender, dob } = req.body;

    // Generate unique hospital patient ID
    const latestPatient = await Patient.findOne().sort({ createdAt: -1 });
    let newPatientId;
    if (latestPatient) {
      const lastPatientId = parseInt(latestPatient.patientId.split("-")[1]);
      newPatientId = `PAT-${String(lastPatientId + 1).padStart(4, "0")}`;
    } else {
      newPatientId = "PAT-0001";
    }

    const patient = await Patient.create({
      patientId: newPatientId,
      firstName,
      lastName,
      gender,
      dob
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Get all patients
 * @route   GET /api/patients
 */
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Get patient by MongoDB ID OR patientId
 * @route   GET /api/patients/:id
 */
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    let patient;

    // Check if it's a valid Mongo ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      patient = await Patient.findById(id);
    }

    // If not found, try by hospital patientId
    if (!patient) {
      patient = await Patient.findOne({ patientId: id });
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Update patient
 * @route   PUT /api/patients/:id
 */
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID"
      });
    }

    const patient = await Patient.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Delete patient
 * @route   DELETE /api/patients/:id
 */
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID"
      });
    }

    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
