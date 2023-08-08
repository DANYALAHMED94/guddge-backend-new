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
  getNotify,
  openNotification,
} from "../controller/timeSheetController.js";
import express from "express";

const timeSheetRouter = express.Router();

timeSheetRouter.post("/view-time-sheets", timeSheetData);
timeSheetRouter.get("/timesheets/approval/:id", getTimeSheetData);
timeSheetRouter.get("/timesheets/approval", allAdminApproval);
timeSheetRouter.get("/timesheets-categories", getCategories);

timeSheetRouter.get("/view-time-sheets/:id", getDataById);
timeSheetRouter.put("/view-time-sheets/:id", editDataById);

timeSheetRouter.get("/notify/:id", getNotify);
timeSheetRouter.put("/notification-open/:id", openNotification);

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
