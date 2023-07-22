import {
  timeSheetData,
  getTimeSheetData,
  shareWithGuddge,
  getDataById,
  getApproved,
  allDraft,
  allApproved,
  allRejected,
  editDataById,
  sheetDeleteById,
  sheetRejectDecsById,
  allTimeSheetsReports,
  allApprovedDates,
  allAdminDraft,
  allAdminApproval,
  allAdminApproved,
  allAdminRejected,
  getCategories,
} from "../controller/timeSheetController.js";
import express from "express";
import { test } from "../controller/testController.js";

const timeSheetRouter = express.Router();
timeSheetRouter.get("/test", test);

timeSheetRouter.post("/view-time-sheets", timeSheetData);
timeSheetRouter.get("/timesheets/approval/:id", getTimeSheetData);
timeSheetRouter.get("/timesheets/approval", allAdminApproval);
timeSheetRouter.get("/timesheets-categories", getCategories);

timeSheetRouter.get("/view-time-sheets/:id", getDataById);
timeSheetRouter.put("/view-time-sheets/:id", editDataById);

timeSheetRouter.delete("/timesheets/:id", sheetDeleteById);
timeSheetRouter.get("/timesheets/draft/:id", allDraft);
timeSheetRouter.get("/timesheets/draft", allAdminDraft);

timeSheetRouter.get("/timesheets/approved/:id", allApproved);
timeSheetRouter.get("/timesheets/approved", allAdminApproved);

timeSheetRouter.get("/timesheets-reports", allTimeSheetsReports);
timeSheetRouter.get("/all-approved-dates", allApprovedDates);

timeSheetRouter.get("/timesheets/rejected/:id", allRejected);
timeSheetRouter.get("/timesheets/rejected", allAdminRejected);

timeSheetRouter.get("/timesheets/:id", getDataById);
timeSheetRouter.put("/timesheets/:id", getApproved);
timeSheetRouter.put("/timesheets/desc/:id", sheetRejectDecsById);

timeSheetRouter.put("/view-time-sheets", shareWithGuddge);

export default timeSheetRouter;
