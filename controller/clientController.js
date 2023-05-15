import jwt from "jsonwebtoken";
import Client from "../model/clientModel.js";

const createClient = async (req, res) => {
  const {
    clientName,
    email,
    phoneNumber,
    DOB,
    identificationNumber,
    guddgeEmailPlan,
    companyName,
    socialSecurityNumber,
  } = req.body;
  // console.log(req.body);
  const user = await Client.findOne({ email: email });
  if (user) {
    res.status(400).json({
      success: false,
      message: "Client already exist against this email",
    });
  } else {
    if (
      (clientName && email && phoneNumber,
      DOB &&
        identificationNumber &&
        guddgeEmailPlan &&
        companyName &&
        socialSecurityNumber)
    ) {
      try {
        const newUser = new Client({
          clientName: clientName,
          email: email,
          phoneNumber: phoneNumber,
          DOB: DOB,
          identificationNumber: identificationNumber,
          companyName: companyName,
          guddgeEmailPlan: guddgeEmailPlan,
          socialSecurityNumber: socialSecurityNumber,
        });
        await newUser.save();

        const saveUser = await Client.findOne({ email: email });
        const token = jwt.sign(
          { userId: saveUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "10d" }
        );
        res.status(200).json({
          success: true,
          message: "Client created successful",
          userID: saveUser._id,
          clientName: saveUser.clientName,
          //   role: saveUser.role,
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

export { createClient };
