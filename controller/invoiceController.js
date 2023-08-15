import Invoices from "../model/generateInvioceModel.js";
import User from "../model/userModel.js";
import XLSX from "xlsx";
import sgMail from "@sendgrid/mail";


const generateInvoice = async (req, res) => {
  if (req.body !== null && req.body !== undefined) {
    try {
      const dataTable = await Invoices.insertMany(req.body);
      res.status(200).json({
        success: true,
        message: "Invoice generated successfully",
        dataTable,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: "Something wents wrong",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Something wents wrong",
    });
  }
};

const invoiceCreatedDate = async (req, res) => {
  try {
    const data = await Invoices.find();
    res.status(200).json({
      success: true,
      message: "craeted date",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const allInvoiceReports = async (req, res) => {
  const { client, status, startDate, endDate } = req.query;
  // const startDate = "06/23/2023";
  // const endDate = "06/27/2023";
  const filter = {};
  if (client) {
    filter.clientName = { $regex: client, $options: "i" };
  }
  if (status) {
    filter.status = status;
  }
  if (startDate && endDate) {
    filter.sharedDate = { $gte: startDate, $lte: endDate };
  }
  try {
    const data = await Invoices.find(filter).sort({ sharedDate: -1 });
    res.status(200).json({
      success: true,
      message: "All Invoices",
      data,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "something wents wrong",
    });
  }
};

const invoiceDeleteById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Invoices.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: "Deleted",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "You are not able to delete this",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const data = await Invoices.findById({ _id: id });
      res.status(200).json({
        success: true,
        message: "Data by Id",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const data = await Invoices.findByIdAndUpdate(
        { _id: id },
        { status: "paid" }
      );
      res.status(200).json({
        success: true,
        message: "Paid",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const sendMailToclient = async (req, res) => {
  const { id } = req.params;
  const dataSheet = await Invoices.findById(id);
  const timeSheetName = dataSheet?.timeSheetName.trim();
  // const adminEmail = await User.findById(dataSheet.user, { email: 1 }); // adminEmail.email
  const clientEmail = await User.findById(dataSheet.clientId, { email: 1 }); // clientEmail.email

  const data = dataSheet?.dataSheet;
  const addObject = {
    changeDate: `date ${dataSheet?.miscellaneous[0].date}`,
    ID: `reason ${dataSheet?.miscellaneous[0].reason}`,
    hour: `cost ${dataSheet?.miscellaneous[0].cost}`,
    task: `total ${dataSheet?.total}`,
  };
  data.push(addObject);

  const parsedData = data?.map((obj) => {
    delete obj._id;
    const objString = JSON.stringify(obj);
    const validJSONString = objString.replace(
      /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
      '"$2": '
    );
    return JSON.parse(validJSONString);
  });
  // Extract the column names
  const columns = Object.keys(parsedData[0]);

  // Create the data array in tabular format
  const dataArray = [];
  dataArray.push(columns); // Add the column headers as the first row
  parsedData.forEach((obj) => {
    const row = columns.map((key) => obj[key]);
    dataArray.push(row);
  });

  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.aoa_to_sheet(dataArray, {
    header: [
      "changedate",
      "ID",
      "hour",
      " invoiceCategory",
      "project",
      "task",
      "rate",
      "comments",
    ],
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, "excel");

  const excelBuffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });
  const fileBase64 = excelBuffer.toString("base64");

  sendInvoiceToClient(fileBase64, clientEmail, timeSheetName);
};

export {
  generateInvoice,
  allInvoiceReports,
  invoiceDeleteById,
  getInvoiceById,
  invoiceCreatedDate,
  changeStatus,
  sendMailToclient,
};

const sendInvoiceToClient = (file, mail, timeSheetName) => {
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const msg = {
      to: `ashiqarooj846@gmail.com`,
      from: {
        name: "guddge",
        email: "testuser@guddge.com",
      }, // Use the email address or domain you verified above
      subject: "Your invoice report",
      text: `our invoice report`,
      attachments: [
        {
          content: file,
          filename: `${timeSheetName}.xlsx`,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          disposition: "attachment",
        },
      ],
    };
    sgMail.send(msg);
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
