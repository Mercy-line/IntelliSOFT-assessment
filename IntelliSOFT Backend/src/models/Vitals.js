import mongoose from "mongoose";

const VitalsSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    height: {
      type: Number, // in cm
      required: true,
      min: 0
    },

    weight: {
      type: Number, // in kg
      required: true,
      min: 0
    },

    bmiStatus: {
      type: String,
      enum: ["Underweight", "Normal", "Overweight"],
      default: "Normal"
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
 * Automatically calculate BMI status before saving
 */
VitalsSchema.pre("save", function (next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    const bmi = this.weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) this.bmiStatus = "Underweight";
    else if (bmi >= 18.5 && bmi < 25) this.bmiStatus = "Normal";
    else this.bmiStatus = "Overweight";
  }

});

export default mongoose.model("Vitals", VitalsSchema);
