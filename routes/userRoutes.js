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
  disableUser,
} from "../controller/userController.js";
import express from "express";
import checkAuthUser from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register-by-email", Signup);
router.post("/login-by-email", Login);
router.get("/find-user-by-id/:id", checkAuthUser, findUserById);
router.put("/edit-user/:id", checkAuthUser, editUser);
router.post("/timesheet", checkAuthUser, LoginByMSOffice);
router.get("/all-contractors", allContractors);
router.put("/reset-password/:id", checkAuthUser, changePasswordAndUpdate);
router.get("/all-clients", allClients);
router.get("/view-time-sheets", allAdmins);
router.get("/client-rates", clientRates);
router.put("/disable-user/:id", disableUser);

router.get("/all-users-date-of-birth", allUsersDateOfBirth);

export default router;
