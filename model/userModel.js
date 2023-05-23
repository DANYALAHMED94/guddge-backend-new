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
    required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
    trim: true,
  },
  DOB: {
    type: String,
    // required: true,
  },

  socialSecurityNumber: {
    type: String,
    // required: true,
    trim: true,
  },
  jobTitle: {
    type: String,
    // required: true,
    trim: true,
  },
  joiningDate: {
    type: String,
    // required: true,
  },
  totalYearExperince: {
    type: String,
    // required: true,
  },
  guddgeEmailPlan: {
    type: String,
    // required: true,
    trim: true,
  },
  agreement: {
    type: String,
    // required: true,
    trim: true,
  },
  agreementEndDate: {
    type: String,
    // required: true,
  },
  shore: {
    type: String,
    // required: true,
  },
  companyName: {
    type: String,
    // required: true,
  },
  identificationNumber: {
    type: String,
    // required: true,
  },
  mailingAddress: {
    type: String,
    // required: true,
  },
  emailingAddressForSoftCopies: {
    type: String,
    // required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
