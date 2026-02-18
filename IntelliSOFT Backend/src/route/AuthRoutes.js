import { Router } from "express";
import {validateRegister,validateLogin} from "../middlewares/authMiddleware.js"
import { login,register } from "../controllers/authControllers.js";
const router= Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
