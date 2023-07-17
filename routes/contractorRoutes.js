import express from "express";
import {
  createContractor,
  contractorData,
} from "../controller/contractorController.js";

const contractorRoute = express.Router();

contractorRoute.put("/contractors", createContractor);
contractorRoute.get("/contractors-data", contractorData);

export default contractorRoute;
