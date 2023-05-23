import express from "express";
import { createClient } from "../controller/clientController.js";

const clientRoute = express.Router();

clientRoute.put("/clients", createClient);

export default clientRoute;
