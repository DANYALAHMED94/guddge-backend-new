import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const createContractor = async (req, res) => {
  const {
    name,
    email,
    jobTitle,
    phoneNumber,
    DOB,
    joiningDate,
    totalYearExperince,
    guddgeEmailPlan,
    agreement,
    agreementEndDate,
    shore,
    companyName,
    identificationNumber,
    socialSecurityNumber,
    mailingAddress,
    emailingAddressForSoftCopies,
  } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ email: email });
  if (user) {
    if (
      (name && email && jobTitle && phoneNumber,
      DOB &&
        joiningDate &&
        totalYearExperince &&
        guddgeEmailPlan &&
        agreement &&
        shore &&
        agreementEndDate &&
        companyName &&
        identificationNumber &&
        socialSecurityNumber &&
        mailingAddress &&
        emailingAddressForSoftCopies)
    ) {
      try {
        user.name = name || user.name;
        user.email = email || user.email;
        user.jobTitle = jobTitle || user.jobTitle;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.DOB = DOB || user.DOB;
        user.totalYearExperince = totalYearExperince || user.totalYearExperince;
        user.guddgeEmailPlan = guddgeEmailPlan || user.guddgeEmailPlan;
        user.agreement = agreement || user.agreement;
        user.shore = shore || user.shore;
        user.agreementEndDate = agreementEndDate || user.agreementEndDate;
        user.companyName = companyName || user.companyName;
        user.identificationNumber =
          identificationNumber || user.identificationNumber;
        user.socialSecurityNumber =
          socialSecurityNumber || user.socialSecurityNumber;
        user.mailingAddress = mailingAddress || user.mailingAddress;
        user.emailingAddressForSoftCopies =
          emailingAddressForSoftCopies || user.emailingAddressForSoftCopies;
        user.joiningDate = joiningDate || user.joiningDate;

        await user.save();
        res.status(200).json({
          success: true,
          message: "Contractor created successful",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          mesaage: "Something wents wrong",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please fill empty fields",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Contractor do not exist against this email",
    });
  }
};

export { createContractor };
