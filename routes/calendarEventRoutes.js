import {
  calendarEvent,
  allCalendarEvent,
  allHolidayEvent,
  allCalendarEventAndBirthdays,
  deleteEvent,
} from "../controller/calendarEventController.js";
import express from "express";

const eventRouter = express.Router();

eventRouter.post("/calender", calendarEvent);
eventRouter.get("/calender", allCalendarEvent);
eventRouter.delete("/delete-event/:id", deleteEvent);
eventRouter.get("/calendar", allHolidayEvent);
eventRouter.get("/cal", allCalendarEventAndBirthdays);

export default eventRouter;
