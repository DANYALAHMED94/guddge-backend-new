import {
  calendarEvent,
  allCalendarEvent,
  allHolidayEvent,
  allCalendarEventAndBirthdays,
} from "../controller/calendarEventController.js";
import express from "express";

const eventRouter = express.Router();

eventRouter.post("/calender", calendarEvent);
eventRouter.get("/calender", allCalendarEvent);
eventRouter.get("/calendar", allHolidayEvent);
eventRouter.get("/cal", allCalendarEventAndBirthdays);

export default eventRouter;
