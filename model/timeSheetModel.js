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
<<<<<<< HEAD
  desc: String,
=======
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
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
<<<<<<< HEAD
  miscellaneous: [{ date: String, reason: String, cost: String }],
=======
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
});

const TimeSheet = mongoose.model("timesheet", timeSheetSchema);

export default TimeSheet;
