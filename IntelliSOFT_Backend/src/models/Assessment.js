import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    healthStatus: {
      type: String,
      enum: ["Good", "Bad"],
      required: true
    },

    onDiet: {
      type: String,
      enum: ["Yes", "No", "N/A"], // N/A if patient is overweight/obese
      default: "N/A"
    },

    onDrugs: {
      type: String,
      enum: ["Yes", "No", "N/A"], // N/A if patient is normal/underweight
      default: "N/A"
    },

    visitDate: {
      type: Date,
      required: true
    },

    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

/**
 * Pre-save hook to enforce conditional logic
 * - Normal/Underweight: check diet, drugs = N/A
 * - Overweight/Obese: check drugs, diet = N/A
 */
AssessmentSchema.pre("save", async function (next) {
  try {
    const Vitals = mongoose.model("Vitals");

    // Get latest vitals for this patient
    const latestVitals = await Vitals.findOne({ patient: this.patient })
      .sort({ recordedAt: -1 });

    if (latestVitals) {
      const bmiStatus = latestVitals.bmiStatus;

      if (bmiStatus === "Underweight" || bmiStatus === "Normal") {
        this.onDrugs = "N/A"; // ignore drugs
        if (!this.onDiet) this.onDiet = "No"; // default diet to No if not provided
      } else if (bmiStatus === "Overweight" || bmiStatus === "Obese") {
        this.onDiet = "N/A"; // ignore diet
        if (!this.onDrugs) this.onDrugs = "No"; // default drugs to No if not provided
      }
    }

  
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Assessment", AssessmentSchema);
