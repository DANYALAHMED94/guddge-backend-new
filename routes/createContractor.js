import path from "path";
import express from "express";
import multer from "multer";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

const pdfRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdfuploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf format allowed!"));
    }
  },
});

// Upload route
pdfRoute.post("/pdfupload", upload.single("agreement"), async (req, res) => {
  const password = generateRandomPassword(8);

  const {
    name,
    email,
    jobTitle,
    phoneNumber,
    contractorRate,
    DOB,
    joiningDate,
    totalYearExperince,
    guddgeEmailPlan,
    agreementEndDate,
    shore,
    companyName,
    identificationNumber,
    socialSecurityNumber,
    mailingAddress,
    alternativeEmailAdress,
  } = req.body;
  const agreement = req?.file?.agreement;

  const user = await User.findOne({ email: email });

  if (!user) {
    if (name && email && password && phoneNumber && shore && contractorRate) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      try {
        const newUser = new User({
          name: name,
          email: email,
          password: hashPassword,
          jobTitle: jobTitle,
          phoneNumber: phoneNumber,
          role: "Contractor",
          DOB: DOB,
          contractorRate: contractorRate,
          totalYearExperince: totalYearExperince,
          guddgeEmailPlan: guddgeEmailPlan,
          agreement: req.file.path,
          shore: shore,
          agreementEndDate: agreementEndDate,
          companyName: companyName,
          identificationNumber: identificationNumber,
          socialSecurityNumber: socialSecurityNumber,
          mailingAddress: mailingAddress,
          alternativeEmailAdress: alternativeEmailAdress,
          joiningDate: joiningDate,
        });

        const addContractor = await newUser.save();
        // sendPasswordToUser(addContractor?.email, password);
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
      message: "Contractor exist against this email",
    });
  }
});

export default pdfRoute;

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
