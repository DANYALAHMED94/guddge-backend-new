import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  clientName: {
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
    type: String,
    required: true,
  },
  identificationNumber: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  guddgeEmailPlan: {
    type: String,
    required: true,
    trim: true,
  },
  socialSecurityNumber: {
    type: String,
    required: true,
    trim: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
