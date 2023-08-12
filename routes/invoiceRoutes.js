import {
  generateInvoice,
  allInvoiceReports,
  invoiceDeleteById,
  getInvoiceById,
  invoiceCreatedDate,
  changeStatus,
  sendMailToclient,
} from "../controller/invoiceController.js";
import express from "express";

const invoiceRouter = express.Router();

invoiceRouter.post("/generate-invoice", generateInvoice);
invoiceRouter.post("/send-mail-to-client/:id", sendMailToclient);
invoiceRouter.get("/invoice-reports", allInvoiceReports);
invoiceRouter.delete("/invoice-report-delete/:id", invoiceDeleteById);
invoiceRouter.get("/view-invoice/:id", getInvoiceById);
invoiceRouter.put("/invoice-status-paid/:id", changeStatus);

invoiceRouter.get("/invoice-created-date", invoiceCreatedDate);

export default invoiceRouter;
