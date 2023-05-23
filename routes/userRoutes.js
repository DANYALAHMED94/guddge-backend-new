import {
  Signup,
  Login,
  allAdmins,
  allUsersDateOfBirth,
} from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register-by-email", Signup);
router.post("/login-by-email", Login);
router.get("/view-time-sheets", allAdmins);
router.get("/all-users-date-of-birth", allUsersDateOfBirth);

export default router;
