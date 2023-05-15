import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connnectDb from "./config/db.js";
import router from "./routes/userRoutes.js";
import adminroute from "./routes/adminRoutes.js";
import contractorRoute from "./routes/contractorRoutes.js";
import clientRoute from "./routes/clientRoutes.js";
import timeSheetRouter from "./routes/timeSheetRoutes.js";
import eventRouter from "./routes/calendarEventRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const MONDO_DB = process.env.DATABASE_URL;
const isConnected = await connnectDb(MONDO_DB);

app.use("/", router);
app.use("/", adminroute);
app.use("/", contractorRoute);
app.use("/", clientRoute);
app.use("/", timeSheetRouter);
app.use("/", eventRouter);

app.get("/", (req, res) => {
  res.send("welcome");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  if (isConnected) {
    console.log(`App is running on port ${PORT}`);
  }
});
