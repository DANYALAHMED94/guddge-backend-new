import {
  calendarEvent,
  allCalendarEvent,
  allHolidayEvent,
} from "../controller/calendarEventController.js";
import express from "express";

const eventRouter = express.Router();

eventRouter.post("/calender", calendarEvent);
eventRouter.get("/calender", allCalendarEvent);
eventRouter.get("/calendar", allHolidayEvent);

export default eventRouter;
