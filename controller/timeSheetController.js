import TimeSheet from "../model/timeSheetModel.js";

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
  try {
    const data = await TimeSheet.find({ status: "Need approval" });
    res.status(200).json({
      success: true,
      message: "Required data",
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

const shareWithGuddge = async (req, res) => {
  const { user, name, timeSheetName, currentDate, status, dataSheet, _id } =
    req.body;

  try {
    const data = await TimeSheet.findByIdAndUpdate(_id, {
      user: user,
      name: name,
      timeSheetName: timeSheetName,
      currentDate: currentDate,
      status: status,
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
    const data = await TimeSheet.findById(id);
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
  const { status } = req.body;
  try {
    await TimeSheet.findByIdAndUpdate(
      { _id: id },
      {
        status: status,
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

const allApproved = async (req, res) => {
  try {
    const data = await TimeSheet.find({ status: "Approved" });

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

const allRejected = async (req, res) => {
  try {
    const data = await TimeSheet.find({ status: "Rejected" });

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

export {
  timeSheetData,
  getTimeSheetData,
  shareWithGuddge,
  getDataById,
  getApproved,
  allApproved,
  allRejected,
  editDataById,
  sheetDeleteById,
};
