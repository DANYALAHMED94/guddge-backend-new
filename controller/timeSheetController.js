import TimeSheet from "../model/timeSheetModel.js";
import User from "../model/userModel.js";

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
    } else if (user?.role === "Admin") {
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
  const { status, approvalDate, approvedBy } = req.body;
  try {
    await TimeSheet.findByIdAndUpdate(
      { _id: id },
      {
        status: status,
        approvalDate: approvalDate,
        approvedBy: approvedBy,
      }
    );
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

    if (user.role === "Contractor") {
      const data = await TimeSheet.find(filter);

      res.status(200).json({
        success: true,
        message: "draft",
        data,
      });
    } else if (user.role === "Admin") {
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
    } else if (user?.role === "Admin") {
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
    } else if (user?.role === "Admin") {
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
  const { contractor, date, category } = req.query;
  const startDate = "";
  const endDate = "";
  // const matchQuery = {
  //   status: "Approved",
  //   $or: [
  //     {
  //       $and: [
  //         { name: { $regex: `${contractor}`, $options: "i" } },
  //         {
  //           "dataSheet.invoiceCategory": {
  //             $regex: `${category}`,
  //             $options: "i",
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       $and: [
  //         { name: { $exists: false } },
  //         { "dataSheet.invoiceCategory": { $exists: false } },
  //       ],
  //     },
  //   ],
  // };

  // // Check if startDate and endDate are provided, then add the approvalDate condition to the match query
  // if (startDate && endDate) {
  //   matchQuery.$or[0].$and.push({
  //     approvalDate: { $gte: startDate, $lte: endDate },
  //   });
  // }
  try {
    const data = await TimeSheet.aggregate([
      // simple filter date
      {
        $match: {
          status: "Approved",
          $or: [
            {
              $and: [
                { name: { $regex: `${contractor}`, $options: "i" } },
                { approvalDate: { $regex: `${date}`, $options: "i" } },
                {
                  "dataSheet.invoiceCategory": {
                    $regex: `${category}`,
                    $options: "i",
                  },
                },
              ],
            },
            {
              $and: [
                { name: { $exists: false } },
                { approvalDate: date },
                { "dataSheet.invoiceCategory": { $exists: false } },
              ],
            },
            {
              $and: [
                { name: { $exists: false } },
                { approvalDate: { $exists: false } },
                {
                  "dataSheet.invoiceCategory": {
                    $regex: `${category}`,
                    $options: "i",
                  },
                },
              ],
            },
          ],
        },
      },

      // for date range
      // {
      //   $match: {
      //     status: "Approved",
      //     $or: [
      //       {
      //         $and: [
      //           { name: { $regex: `${contractor}`, $options: "i" } },
      //           { approvalDate: { $gte: startDate, $lte: endDate } },
      //           {
      //             "dataSheet.invoiceCategory": {
      //               $regex: `${category}`,
      //               $options: "i",
      //             },
      //           },
      //         ],
      //       },
      //       {
      //         $and: [
      //           { name: { $exists: false } },
      //           { approvalDate: { $gte: startDate, $lte: endDate } },
      //           { "dataSheet.invoiceCategory": { $exists: false } },
      //         ],
      //       },
      //       {
      //         $and: [
      //           { name: { $exists: false } },
      //           { approvalDate: { $exists: false } },
      //           {
      //             "dataSheet.invoiceCategory": {
      //               $regex: `${category}`,
      //               $options: "i",
      //             },
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
      { $unwind: "$dataSheet" },

      {
        $match: {
          "dataSheet.invoiceCategory": { $regex: category, $options: "i" },
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
      message: "All timesheets",
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
};
