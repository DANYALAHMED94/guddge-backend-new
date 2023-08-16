import TimeSheet from "../model/timeSheetModel.js";
import User from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config({ path: "./sendgrid.env" });
import sgMail from "@sendgrid/mail";

const timeSheetData = async (req, res) => {
  if (req.body !== null && req.body !== undefined) {
    try {
      const dataTable = await TimeSheet.insertMany(req.body);
      res.status(200).json({
        success: true,
        message: "Data submitted successfully",
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

const getTimeSheetData = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user?.role === "Contractor") {
      const filter = {
        user: id,
        status: "Need approval",
      };
      const data = await TimeSheet.find(filter);

      res.status(200).json({
        success: true,
        message: "all need approval sheets",
        data,
      });
    } else if (user?.role === "Admin" || user?.role === "Super Admin") {
      const filter = {
        $or: [{ user: id }, { adminId: id }],
        status: "Need approval",
      };
      const data = await TimeSheet.find(filter);

      res.status(200).json({
        success: true,
        message: "all need approval sheets",
        data,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const shareWithGuddge = async (req, res) => {
  const {
    user,
    name,
    adminId,
    timeSheetName,
    currentDate,
    status,
    dataSheet,
    _id,
  } = req.body;

  try {
    const data = await TimeSheet.findByIdAndUpdate(_id, {
      user: user,
      name: name,
      timeSheetName: timeSheetName,
      currentDate: currentDate,
      status: status,
      adminId: adminId,
      dataSheet: dataSheet,
    });
    res.status(200).json({
      success: true,
      message: "shared",
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

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TimeSheet.findById(id).sort({ currentDate: -1 });
    res.status(200).json({
      success: true,
      message: "shared",
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

const getApproved = async (req, res) => {
  const { id } = req.params;
  const projection = {
    _id: 0, // 0 means don't include this field in the result
    email: 1, // 1 means include this field in the result
  };
  const { status, approvalDate, approvedBy, desc } = req.body;
  const getIdValue = await TimeSheet.findById(id);
  const allMails = await User.find({ role: "Admin" }, projection);
  const emails = allMails.map((user) => user.email);
  const contractor = await User.findById(getIdValue?.user);

  try {
    await TimeSheet.findByIdAndUpdate(
      { _id: id },
      {
        status: status,
        approvalDate: approvalDate,
        approvedBy: approvedBy,
        desc: desc,
        notify: {
          case: status,
          text: `Your Timesheet has been ${status}`,
          open: false,
          timesheetId: getIdValue._id,
          user: getIdValue.user,
        },
      }
    );
    if (status !== "draft") {
      sendMailToAdmins(status, emails);
    }
    if (status === "Approved" || status === "Rejected") {
      sendMailToContractor(status, contractor?.email, desc);
    }
    if (status) {
      res.status(200).json({
        success: true,
        message: "shared",
        data: status,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const allDraft = async (req, res) => {
  const { id } = req.params;

  const filter = {
    user: id,
    status: "draft",
  };
  try {
    const user = await User.findById(id).sort({ currentDate: -1 });

    if (user?.role === "Contractor") {
      const data = await TimeSheet.find(filter);

      res.status(200).json({
        success: true,
        message: "draft",
        data,
      });
    } else if (user?.role === "Admin" || user?.role === "Super Admin" ) {
      const filter = {
        $or: [{ user: id }, { adminId: id }],
        status: "draft",
      };
      const data = await TimeSheet.find(filter);
      res.status(200).json({
        success: true,
        message: "draft",
        data,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const allApproved = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (user?.role === "Contractor") {
      const filter = {
        user: id,
        status: "Approved",
      };
      const data = await TimeSheet.find(filter).sort({ currentDate: -1 });

      res.status(200).json({
        success: true,
        message: "all approved",
        data,
      });
    } else if (user?.role === "Admin" || user?.role === "Super Admin") {
      const filter = {
        $or: [{ user: id }, { adminId: id }],
        status: "Approved",
      };
      const data = await TimeSheet.find(filter).sort({ currentDate: -1 });
      res.status(200).json({
        success: true,
        message: "all approved",
        data,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const allRejected = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user?.role === "Contractor") {
      const filter = {
        user: id,
        status: "Rejected",
      };
      const data = await TimeSheet.find(filter).sort({ currentDate: -1 });

      res.status(200).json({
        success: true,
        message: "all Rejected",
        data,
      });
    } else if (user?.role === "Admin" || user?.role === "Super Admin") {
      const filter = {
        $or: [{ user: id }, { adminId: id }],
        status: "Rejected",
      };
      const data = await TimeSheet.find(filter).sort({ currentDate: -1 });

      res.status(200).json({
        success: true,
        message: "all Rejected",
        data,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const sheetDeleteById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await TimeSheet.findByIdAndDelete({ _id: id });
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

const editDataById = async (req, res) => {
  const { currentDate, timeSheetName, dataSheet } = req.body;
  const { id } = req.params;
  try {
    await TimeSheet.findByIdAndUpdate(
      { _id: id },
      {
        timeSheetName: timeSheetName,
        currentDate: currentDate,
        dataSheet: dataSheet,
      }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

const sheetRejectDecsById = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;
  try {
    if (id) {
      const timesheet = await TimeSheet.findByIdAndUpdate(
        { _id: id },
        {
          desc: desc,
        }
      );
      res.status(200).json({
        success: true,
        message: "Decription Added Successfully",
        timesheet,
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

const allTimeSheetsReports = async (req, res) => {
  const { contractor, startDate, endDate, category, project, rate, hour, ID } =
    req.query;
  const filter = { status: "Approved" };

  if (contractor) {
    filter["name"] = { $regex: `${contractor}`, $options: "i" };
  }

  if (startDate && endDate) {
    filter["approvalDate"] = { $gte: startDate, $lte: endDate };
  }

  if (category) {
    filter["dataSheet.invoiceCategory"] = {
      $regex: `${category}`,
      $options: "i",
    };
  }

  if (project) {
    filter["dataSheet.project"] = { $regex: `${project}`, $options: "i" };
  }

  if (ID) {
    filter["dataSheet.ID"] = ID;
  }

  if (hour) {
    filter["dataSheet.hour"] = hour;
  }

  if (rate) {
    filter["clientRate"] = rate;
  }

  try {
    const data = await TimeSheet.aggregate([
      {
        $match: filter,
      },
      { $unwind: "$dataSheet" },

      {
        $match: {
          "dataSheet.invoiceCategory": { $regex: `${category}`, $options: "i" },
        },
      },
      {
        $group: {
          _id: "$_id",
          document: { $first: "$$ROOT" },
        },
      },

      {
        $replaceRoot: {
          newRoot: "$document",
        },
      },
    ]).sort({ currentDate: -1 });

    res.status(200).json({
      success: true,
      message: "All timesheets reports",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      success: false,
      message: "something wents wrong",
    });
  }
};

const allApprovedDates = async (req, res) => {
  const projection = {
    approvalDate: 1,
  };
  try {
    const data = await TimeSheet.find({ status: "Approved" }, projection).sort({
      currentDate: -1,
    });

    res.status(200).json({
      success: true,
      message: "shared",
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

const allAdminDraft = async (req, res) => {
  try {
    const data = await TimeSheet.find({ status: "draft" });
    res.status(200).json({
      success: true,
      message: "draft",
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

const allAdminApproval = async (req, res) => {
  try {
    const data = await TimeSheet.find({ status: "Need approval" });
    res.status(200).json({
      success: true,
      message: "Approval",
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

const allAdminApproved = async (req, res) => {
  try {
    const data = await TimeSheet.find({ status: "Approved" });
    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Approved",
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

const allAdminRejected = async (req, res) => {
  try {
    const data = await TimeSheet.find({ status: "Rejected" });
    res.status(200).json({
      success: true,
      message: "all rejected",
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

const getCategories = async (req, res) => {
  try {
    const data = await TimeSheet.aggregate([
      {
        $unwind: "$dataSheet", // Unwind the array into separate documents
      },
      {
        $group: {
          _id: "$dataSheet.invoiceCategory", // Group by the unique category values
        },
      },

      {
        $match: {
          // Exclude categories with specific names
          _id: {
            $nin: ["N/A", ""],
            $exists: true,
            $ne: null,
            $ne: "",
          },
        },
      },

      {
        $project: {
          _id: 0, // Exclude the default "_id" field from the result
          category: "$_id", // Rename the "_id" field to "category"
        },
      },
    ]).sort({ invoiceCategory: 1 });

    res.status(200).json({
      success: true,
      message: "Categories",
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

const getNotify = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TimeSheet.find(
      { "notify.user": id },
      { notify: 1 }
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "notification",
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

const openNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await TimeSheet.updateMany(
      { "notify.user": id },
      { "notify.open": true }
    );

    res.status(200).json({
      success: true,
      message: "notification updated",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
    });
  }
};

export {
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
};

const sendMailToAdmins = async (status, emails) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${emails}`,
    from: {
      name: "guddge",
      email: "testuser@guddge.com",
    }, // Use the email address or domain you verified above
    subject: "You have Timesheet",
    text: `Guddge timesheet ${status}`,
    html: `<strong>Guddge timesheet ${status}</strong>`,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const sendMailToContractor = async (status, contractor, desc) => {
  if (status === "Rejected") {
    const msg = {
      to: `${contractor}`,
      from: {
        name: "guddge",
        email: "testuser@guddge.com",
      }, // Use the email address or domain you verified above
      subject:
        "Your time sheet has been rejected please login to the system and review the time sheet to make some improvements or create a new time sheet",
      text: `Your time sheet has been rejected please login to the system and review the time sheet to make some improvements or create a new time sheet`,
      html: `<strong>Reason for rejection: ${desc}</strong>`,
    };
    try {
      sgMail.send(msg);
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    const msg = {
      to: `${contractor}`,
      from: {
        name: "guddge",
        email: "testuser@guddge.com",
      }, // Use the email address or domain you verified above
      subject: "You have Timesheet",
      text: `Guddge timesheet ${status}`,
      html: `<strong>Guddge timesheet ${status}</strong>`,
    };
    try {
      sgMail.send(msg);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
