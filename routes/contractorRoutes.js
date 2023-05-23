import express from "express";
import { createContractor } from "../controller/contractorController.js";

const contractorRoute = express.Router();

contractorRoute.put("/contractors", createContractor);

export default contractorRoute;
