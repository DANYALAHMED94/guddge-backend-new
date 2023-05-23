import User from "../model/userModel.js";

const createClient = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    DOB,
    identificationNumber,
    guddgeEmailPlan,
    companyName,
    socialSecurityNumber,
  } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (
      (name && email && phoneNumber,
      DOB &&
        identificationNumber &&
        guddgeEmailPlan &&
        companyName &&
        socialSecurityNumber)
    ) {
      try {
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.DOB = DOB || user.DOB;
        user.identificationNumber =
          identificationNumber || user.identificationNumber;
        user.guddgeEmailPlan = guddgeEmailPlan || user.guddgeEmailPlan;
        user.companyName = companyName || user.companyName;
        user.socialSecurityNumber =
          socialSecurityNumber || user.socialSecurityNumber;
        await user.save();

        res.status(200).json({
          success: true,
          message: "Client created successful",
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
      message: "Client do not exist against this email",
    });
  }
};

export { createClient };
