import express from "express";
import { createClient, clientData } from "../controller/clientController.js";

const clientRoute = express.Router();

clientRoute.put("/clients", createClient);
clientRoute.get("/client-data", clientData);

export default clientRoute;
