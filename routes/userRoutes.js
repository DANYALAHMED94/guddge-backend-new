import { Signup, Login, allAdmins } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register-by-email", Signup);
router.post("/login-by-email", Login);
router.get("/view-time-sheets", allAdmins);

export default router;
