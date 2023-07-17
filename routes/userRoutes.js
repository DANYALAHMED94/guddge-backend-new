import {
  Signup,
  Login,
  allAdmins,
  allUsersDateOfBirth,
  LoginByMSOffice,
  allContractors,
  clientRates,
  allClients,
  changePasswordAndUpdate,
  editUser,
  findUserById,
} from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register-by-email", Signup);
router.post("/login-by-email", Login);
router.get("/find-user-by-id/:id", findUserById);
router.put("/edit-user/:id", editUser);
router.post("/timesheet", LoginByMSOffice);
router.get("/all-contractors", allContractors);
router.put("/reset-password", changePasswordAndUpdate);
router.get("/all-clients", allClients);
router.get("/view-time-sheets", allAdmins);
router.get("/client-rates", clientRates);
router.get("/all-users-date-of-birth", allUsersDateOfBirth);

export default router;
