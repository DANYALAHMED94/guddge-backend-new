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
<<<<<<< HEAD
  },
  phoneNumber: {
    type: String,
=======
    required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
    trim: true,
  },
  DOB: {
    type: String,
<<<<<<< HEAD
=======
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
  },

  socialSecurityNumber: {
    type: String,
<<<<<<< HEAD
=======
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
    trim: true,
  },
  jobTitle: {
    type: String,
<<<<<<< HEAD
=======
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
    trim: true,
  },
  joiningDate: {
    type: String,
<<<<<<< HEAD
  },
  totalYearExperince: {
    type: String,
  },
  guddgeEmailPlan: {
    type: String,
=======
    // required: true,
  },
  totalYearExperince: {
    type: String,
    // required: true,
  },
  guddgeEmailPlan: {
    type: String,
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
    trim: true,
  },
  agreement: {
    type: String,
<<<<<<< HEAD
=======
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
    trim: true,
  },
  agreementEndDate: {
    type: String,
<<<<<<< HEAD
=======
    // required: true,
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
  },
  shore: {
    type: String,
    // required: true,
  },
  companyName: {
    type: String,
<<<<<<< HEAD
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
=======
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
>>>>>>> 727bb02d12d77b898ffa648587d9150fb95dda6a
});

const User = mongoose.model("User", userSchema);

export default User;
