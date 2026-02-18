import express from "express";
import cors from "cors";
import ConnectToDB from "./config/db.js";
import patientRoutes from './route/PatientRoutes.js';
import AuthRoutes from './route/AuthRoutes.js';
import vitalsRoutes from "./route/VitalsRoutes.js";
import assessmentRoutes from "./route/AssessmentRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/assessments", assessmentRoutes);

// Start server and connect to DB
app.listen(PORT, async () => {
  await ConnectToDB();
  console.log(`App running at http://localhost:${PORT}`);
});
