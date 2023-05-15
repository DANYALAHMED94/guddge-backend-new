import dotenv from "dotenv";
import Users from "./data/users.js";
import User from "./model/userModel.js";
import connnectDb from "./config/db.js";
import mongoose from "mongoose";

dotenv.config();

const MONDO_DB = process.env.DATABASE_URL;
connnectDb(MONDO_DB);

const importData = async () => {
  try {
    await User.insertMany(Users);
    console.log("user imported");
  } catch (error) {
    console.log(error?.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany(Users);
    console.log("user deleted");
  } catch (error) {
    console.log(error?.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importData();
} else if (process.argv[2] === "-remove ") {
  deleteData();
}
