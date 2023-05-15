import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  role: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
