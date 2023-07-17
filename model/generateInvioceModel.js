import mongoose from "mongoose";
import User from "./userModel.js";

const invoiceSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  name: String,
  timeSheetName: String,
  timeSheetId: String,
  clientId: String,
  clientRate: String,
  clientName: String,
  status: String,
  sharedDate: String,
  total: String,
  deliver: String,
  dataSheet: [
    {
      changeDate: String,
      ID: String,
      hour: String,
      invoiceCategory: String,
      project: String,
      task: String,
      rate: String,
      comments: String,
    },
  ],
  miscellaneous: [{ date: String, reason: String, cost: String }],
});

const Invoices = mongoose.model("Invoices", invoiceSchema);

export default Invoices;
