import mongoose from "mongoose";
import User from "../model/userModel.js";

const eventSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: String,
    required: true,
    trim: true,
  },
  end: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const UserEvents = mongoose.model("Events", eventSchema);

export default UserEvents;
