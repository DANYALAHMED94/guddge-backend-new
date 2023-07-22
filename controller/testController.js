import TimeSheet from "../model/timeSheetModel.js";

const test = async (req, res) => {
  const { contractor, date, category, project, rate, hour, ID } = req.query;
//   const filter = {};

//   // Add the name filter if 'contractor' is provided
//   if (contractor) {
//     filter["name"] = { $regex: `${contractor}`, $options: "i" };
//   }
  
//   // Add the approvalDate filter if 'date' is provided
//   if (date) {
//     filter["approvalDate"] = { $regex: `${date}`, $options: "i" };
//   }
  
//   // Add the invoiceCategory filter if 'category' is provided
//   if (category) {
//     filter["dataSheet.invoiceCategory"] = { $regex: `${category}`, $options: "i" };
//   }
  
//   // Add the project filter if 'project' is provided
//   if (project) {
//     filter["dataSheet.project"] = { $regex: `${project}`, $options: "i" };
//   }
  
//   // Add the ID filter if 'desiredID' is provided
//   if (desiredID) {
//     filter["dataSheet.ID"] = desiredID;
//   }
  
//   // Add the hour filter if 'desiredMinHour' and/or 'desiredMaxHour' are provided
//   if (desiredMinHour !== undefined || desiredMaxHour !== undefined) {
//     filter["dataSheet.hour"] = {};
//     if (desiredMinHour !== undefined) {
//       filter["dataSheet.hour"]["$gte"] = desiredMinHour;
//     }
//     if (desiredMaxHour !== undefined) {
//       filter["dataSheet.hour"]["$lte"] = desiredMaxHour;
//     }
//   }
  
//   // Add the rate filter if 'desiredMinRate' and/or 'desiredMaxRate' are provided
//   if (desiredMinRate !== undefined || desiredMaxRate !== undefined) {
//     filter["dataSheet.rate"] = {};
//     if (desiredMinRate !== undefined) {
//       filter["dataSheet.rate"]["$gte"] = desiredMinRate;
//     }
//     if (desiredMaxRate !== undefined) {
//       filter["dataSheet.rate"]["$lte"] = desiredMaxRate;
//     }
//   }

  try {
    const data = await TimeSheet.aggregate([
      //   {
      //     $match: {
      //       $or: [
      //         {
      //           $and: [
      //             { name: { $regex: `${contractor}`, $options: "i" } },
      //             { approvalDate: { $regex: `${date}`, $options: "i" } },
      //             {
      //               "dataSheet.invoiceCategory": {
      //                 $regex: `${category}`,
      //                 $options: "i",
      //               },
      //             },
      //           ],
      //         },
      //         {
      //           $and: [
      //             { name: { $regex: `${contractor}`, $options: "i" } },
      //             { approvalDate: { $exists: false } },
      //             { "dataSheet.invoiceCategory": { $exists: false } },
      //           ],
      //         },
      //         {
      //           $and: [
      //             { name: { $exists: false } },
      //             { approvalDate: { $regex: `${date}`, $options: "i" } },
      //             { "dataSheet.invoiceCategory": { $exists: false } },
      //           ],
      //         },
      //         {
      //           $and: [
      //             { name: { $exists: false } },
      //             { approvalDate: { $exists: false } },
      //             {
      //               "dataSheet.invoiceCategory": {
      //                 $regex: `${category}`,
      //                 $options: "i",
      //               },
      //             },
      //           ],
      //         },
      //         {
      //           $and: [
      //             { name: { $exists: false } },
      //             { approvalDate: { $exists: false } },
      //             { "dataSheet.invoiceCategory": { $exists: false } },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      {
        $match: {
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
                {
                  "dataSheet.project": { $regex: `${project}`, $options: "i" },
                },
                { "dataSheet.ID": ID },
                { "dataSheet.hour": hour },
                {
                  "dataSheet.rate": rate,
                },
              ],
            },
            {
              $and: [
                { name: { $regex: `${contractor}`, $options: "i" } },
                { approvalDate: { $exists: false } },
                { "dataSheet.invoiceCategory": { $exists: false } },
                {
                  "dataSheet.project": { $regex: `${project}`, $options: "i" },
                },
                { "dataSheet.ID": ID },
                { "dataSheet.hour": hour },
                {
                  "dataSheet.rate": rate,
                },
              ],
            },
            {
              $and: [
                { name: { $exists: false } },
                { approvalDate: { $regex: `${date}`, $options: "i" } },
                { "dataSheet.invoiceCategory": { $exists: false } },
                {
                  "dataSheet.project": { $regex: `${project}`, $options: "i" },
                },
                { "dataSheet.ID": ID },
                { "dataSheet.hour": hour },
                {
                  "dataSheet.rate": rate,
                },
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
                {
                  "dataSheet.project": { $regex: `${project}`, $options: "i" },
                },
                { "dataSheet.ID": ID },
                { "dataSheet.hour": hour },
                {
                  "dataSheet.rate": rate,
                },
              ],
            },
            {
              $and: [
                { name: { $exists: false } },
                { approvalDate: { $exists: false } },
                { "dataSheet.invoiceCategory": { $exists: false } },
                {
                  "dataSheet.project": { $regex: `${project}`, $options: "i" },
                },
                { "dataSheet.ID": ID },
                { "dataSheet.hour": hour },
                {
                  "dataSheet.rate": rate,
                },
              ],
            },
          ],
        },
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

export { test };
