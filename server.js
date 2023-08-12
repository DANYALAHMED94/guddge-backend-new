import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import router from "./routes/userRoutes.js";
import adminroute from "./routes/adminRoutes.js";
import contractorRoute from "./routes/contractorRoutes.js";
import clientRoute from "./routes/clientRoutes.js";
import timeSheetRouter from "./routes/timeSheetRoutes.js";
import eventRouter from "./routes/calendarEventRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import profileRoute from "./routes/userProfileUpload.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";

dotenv.config({ path: "./sendgrid.env" });
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
const MONGO_DB = process.env.MONGO_DB;
mongoose.set("strictQuery", true);
const isConnected = await connectDb(MONGO_DB);

app.use("/api", router);
app.use("/api", adminroute);
app.use("/api", contractorRoute);
app.use("/api", clientRoute);
app.use("/api", timeSheetRouter);
app.use("/api", eventRouter);
app.use("/api", invoiceRouter);
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api", profileRoute);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "./build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  if (isConnected) {
    console.log(`App is running on port ${PORT}`);
  }
});
