import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// dotenv.config({ path: "./sendgrid.env" });
import sgMail from "@sendgrid/mail";

const createClient = async (req, res) => {
  const password = generateRandomPassword(8);
  const {
    name,
    email,
    phoneNumber,
    DOB,
    identificationNumber,
    guddgeEmailPlan,
    companyName,
    socialSecurityNumber,
    clientRate,
    contractorId,
  } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    if (name && email && password && clientRate && contractorId) {
      const contractor = await User.findById(contractorId);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      try {
        const newUser = new User({
          name: name,
          email: email,
          password: hashPassword,
          phoneNumber: phoneNumber,
          contractorRate: contractor.contractorRate,
          DOB: DOB,
          identificationNumber: identificationNumber,
          guddgeEmailPlan: guddgeEmailPlan,
          companyName: companyName,
          socialSecurityNumber: socialSecurityNumber,
          clientRate: clientRate,
          role: "Client",
        });

        const addedUser = await newUser.save();
        sendPasswordToUser(addedUser?.email, password);
        res.status(200).json({
          success: true,
          message: "Admin created successful",
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
      message: "User already exist against this email",
    });
  }
};

const clientData = async (req, res) => {
  const { q } = req.query;

  const filter = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
    role: "Client",
  };
  const projection = {
    name: 1,
    email: 1,
    contractorRate: 1,
    clientRate: 1,
    phoneNumber: 1,
    identificationNumber: 1,
    disable: 1,
  };
  try {
    const client = await User.find(filter, projection).sort({
      name: 1,
    });
    res.status(200).json({
      success: true,
      message: "All client data",
      client,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something wents wrong",
      error,
    });
  }
};

export { createClient, clientData };

const generateRandomPassword = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};

const sendPasswordToUser = async (email, password) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`,
    from: {
      name: "guddge",
      email: "testuser@guddge.com",
    }, // Use the email address or domain you verified above
    subject: "Here is your password for the guddge.",
    text: `${password}`,
    html: `<h1><strong>Email:${email}</strong></h1>
    <h1><strong>Password:${password}</strong></h1>`,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return error;
  }
};
