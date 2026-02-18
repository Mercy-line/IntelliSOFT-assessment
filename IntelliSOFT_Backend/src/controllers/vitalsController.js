import mongoose from "mongoose";
import Vitals from "../models/Vitals.js";
import Patient from "../models/Patient.js";

/**
 * @desc    Create new vitals record for a patient
 * @route   POST /api/vitals
 */
export const createVitals = async (req, res) => {
  try {
    const { patientId, height, weight } = req.body;

    if (!patientId || !height || !weight) {
      return res.status(400).json({
        success: false,
        message: "patientId, height and weight are required"
      });
    }

    // Ensure patient exists
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    const vitals = await Vitals.create({
      patient: patient._id,
      height,
      weight
      // BMI auto-calculated in model (if using pre-save hook)
    });

    res.status(201).json({
      success: true,
      message: "Vitals recorded successfully",
      data: vitals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Get all vitals records
 * @route   GET /api/vitals
 */
export const getAllVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find()
      .populate("patient", "patientId firstName lastName gender")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Get all vitals for a specific patient
 * @route   GET /api/vitals/patient/:patientId
 */
export const getVitalsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    const vitals = await Vitals.find({ patient: patient._id })
      .sort({ recordedAt: -1 });

    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Update a vitals record by ID
 * @route   PUT /api/vitals/:id
 */
export const updateVitals = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vitals record ID"
      });
    }

    const vitals = await Vitals.findById(id);

    if (!vitals) {
      return res.status(404).json({
        success: false,
        message: "Vitals record not found"
      });
    }

    // Only update if values provided
    if (req.body.height !== undefined) {
      vitals.height = req.body.height;
    }

    if (req.body.weight !== undefined) {
      vitals.weight = req.body.weight;
    }

    await vitals.save(); // triggers BMI recalculation hook

    res.status(200).json({
      success: true,
      message: "Vitals updated successfully",
      data: vitals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * @desc    Delete a vitals record by ID
 * @route   DELETE /api/vitals/:id
 */
export const deleteVitals = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vitals record ID"
      });
    }

    const vitals = await Vitals.findById(id);

    if (!vitals) {
      return res.status(404).json({
        success: false,
        message: "Vitals record not found"
      });
    }

    await vitals.deleteOne();

    res.status(200).json({
      success: true,
      message: "Vitals record deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
