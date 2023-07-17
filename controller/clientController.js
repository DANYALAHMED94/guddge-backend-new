import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
    if (
      (name && email && phoneNumber,
      DOB &&
        identificationNumber &&
        guddgeEmailPlan &&
        companyName &&
        password &&
        clientRate &&
        contractorId &&
        socialSecurityNumber)
    ) {
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

        const addContractor = await newUser.save();
        sendPasswordToUser(addContractor?.email, password);

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
      message: "Client exist against this email",
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
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "guddgellc@gmail.com",
      pass: "cFgSdZE1wYmPQ5kV",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "guddge@gmail.com",
    to: email,
    subject: "Your Guddge App Password",
    text: `Your new password is: ${password}`,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
