import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
    dob: {
      type: Date,
      required: true
    },
    dateOfRegistration: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Patient", PatientSchema);
