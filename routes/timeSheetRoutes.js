import {
  timeSheetData,
  getTimeSheetData,
  shareWithGuddge,
  getDataById,
  getApproved,
  allApproved,
  allRejected,
  editDataById,
  sheetDeleteById,
} from "../controller/timeSheetController.js";
import express from "express";

const timeSheetRouter = express.Router();

timeSheetRouter.post("/view-time-sheets", timeSheetData);
timeSheetRouter.get("/timesheets/approval", getTimeSheetData);
timeSheetRouter.get("/view-time-sheets/:id", getDataById);
timeSheetRouter.put("/view-time-sheets/:id", editDataById);

timeSheetRouter.delete("/timesheets/:id", sheetDeleteById);
timeSheetRouter.get("/timesheets/approved", allApproved);
timeSheetRouter.get("/timesheets/rejected", allRejected);
timeSheetRouter.get("/timesheets/:id", getDataById);
timeSheetRouter.put("/timesheets/:id", getApproved);
timeSheetRouter.put("/view-time-sheets", shareWithGuddge);

export default timeSheetRouter;
