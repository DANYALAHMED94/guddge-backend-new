import UserEvents from "../model/calendarEventModel.js";

const calendarEvent = async (req, res) => {
  const { user, title, start, end, color, desc } = req.body;
  if (user && title && start && end && color && desc) {
    try {
      const event = new UserEvents({
        user: user,
        title: title,
        start: start,
        end: end,
        color: color,
        desc: desc,
      });

      const saveEvent = await event.save();
      res.status(200).json({
        success: false,
        message: "Event successfully added",
        saveEvent,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something wents wrong!",
        error: error,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Please fill empty fields",
    });
  }
};

const allCalendarEvent = async (req, res) => {
  try {
    const allevents = await UserEvents.find();
    res.status(200).json({
      success: false,
      message: "Event successfully added",
      allevents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
      error: error,
    });
  }
};

const allHolidayEvent = async (req, res) => {
  try {
    const allevents = await UserEvents.find({ color: "blue" });
    res.status(200).json({
      success: false,
      message: "Event successfully added",
      allevents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
      error: error,
    });
  }
};

const allCalendarEventAndBirthdays = async (req, res) => {
  try {
    const allevents = await UserEvents.aggregate([
      {
        $lookup: {
          from: "$User",
          localField: "DOB", // Assuming there is a field named 'userId' in the 'events' collection that corresponds to the '_id' in the 'users' collection
          foreignField: "name",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          user: {
            name: "$user.name",
            dateOfBirth: "$user.DOB",
            color: "pink",
          },
        },
      },
      {
        $project: {
          "user._id": 0,
        },
      },
    ]);
    res.status(200).json({
      success: false,
      message: "Event successfully added",
      allevents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong!",
      error: error,
    });
  }
};

export {
  calendarEvent,
  allCalendarEvent,
  allHolidayEvent,
  allCalendarEventAndBirthdays,
};
