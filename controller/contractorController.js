import Contractor from "../model/contractorModel.js";
import jwt from "jsonwebtoken";

const createContractor = async (req, res) => {
  const {
    contractorName,
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
  const user = await Contractor.findOne({ email: email });
  if (user) {
    res.status(400).json({
      success: false,
      message: "Contractor already exist against this email",
    });
  } else {
    if (
      (contractorName && email && jobTitle && phoneNumber,
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
        const newUser = new Contractor({
          contractorName: contractorName,
          email: email,
          jobTitle: jobTitle,
          phoneNumber: phoneNumber,
          DOB: DOB,
          joiningDate: joiningDate,
          totalYearExperince: totalYearExperince,
          guddgeEmailPlan: guddgeEmailPlan,
          agreement: agreement,
          agreementEndDate: agreementEndDate,
          shore: shore,
          companyName: companyName,
          identificationNumber: identificationNumber,
          socialSecurityNumber: socialSecurityNumber,
          mailingAddress: mailingAddress,
          emailingAddressForSoftCopies: emailingAddressForSoftCopies,
        });
        await newUser.save();
        const saveUser = await Contractor.findOne({ email: email });
        const token = jwt.sign(
          { userId: saveUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "10d" }
        );
        res.status(200).json({
          success: true,
          message: "Contractor created successful",
          userID: saveUser._id,
          contractorName: saveUser.contractorName,
          token: token,
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
  }
};

export { createContractor };
