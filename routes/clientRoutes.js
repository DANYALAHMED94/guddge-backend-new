import express from "express";
import { createClient } from "../controller/clientController.js";

const clientRoute = express.Router();

clientRoute.post("/clients", createClient);

export default clientRoute;
