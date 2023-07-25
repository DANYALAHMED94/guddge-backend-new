import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
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
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Client", "Contractor"],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  DOB: {
    type: String,
  },

  socialSecurityNumber: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  joiningDate: {
    type: String,
  },
  totalYearExperince: {
    type: String,
  },
  guddgeEmailPlan: {
    type: String,
    trim: true,
  },
  agreement: {
    type: String,
    trim: true,
  },
  agreementEndDate: {
    type: String,
  },
  shore: {
    type: String,
    // required: true,
  },
  companyName: {
    type: String,
  },
  identificationNumber: {
    type: String,
  },
  mailingAddress: {
    type: String,
  },
  alternativeEmailAdress: {
    type: String,
  },
  filename: String,
  clientRate: String,
  contractorRate: String,
});

const User = mongoose.model("User", userSchema);

export default User;
