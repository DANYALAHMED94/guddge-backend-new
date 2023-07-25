import mongoose from "mongoose";
import User from "../model/userModel.js";

const timeSheetSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  adminId: String,
  name: String,
  timeSheetName: String,
  currentDate: String,
  status: String,
  approvalDate: String,
  approvedBy: String,
  desc: String,
  dataSheet: [
    {
      changeDate: String,
      ID: String,
      hour: String,
      invoiceCategory: String,
      project: String,
      task: String,
      comments: String,
    },
  ],
  miscellaneous: [{ date: String, reason: String, cost: String }],
});

const TimeSheet = mongoose.model("timesheet", timeSheetSchema);

export default TimeSheet;
