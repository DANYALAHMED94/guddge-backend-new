import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: "./sendgrid.env" });
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createAdmin = async (req, res) => {
  const password = generateRandomPassword(8);
  const { name, email, phoneNumber, DOB } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    if (name && email && password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      try {
        const newUser = new User({
          name: name,
          email: email,
          password: hashPassword,
          phoneNumber: phoneNumber,
          DOB: DOB,
          role: "Admin",
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
      message: "Admin already exist against this email",
    });
  }
};

export { createAdmin };

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
  const msg = {
    to: `${email}`,
    from: {
      name: "guddge",
      email: "testuser@guddge.com",
    }, // Use the email address or domain you verified above
    subject: "Your Password for guddge app",
    text: `${password}`,
    html: `<strong>${password}</strong>`,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return error;
  }
};
