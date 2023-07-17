import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const createContractor = async (req, res) => {
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
  if (!user) {
    if (
      (name && email && password && jobTitle && phoneNumber,
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
        contractorRate &&
        mailingAddress &&
        emailingAddressForSoftCopies)
    ) {
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
          agreement: agreement,
          shore: shore,
          agreementEndDate: agreementEndDate,
          companyName: companyName,
          identificationNumber: identificationNumber,
          socialSecurityNumber: socialSecurityNumber,
          mailingAddress: mailingAddress,
          emailingAddressForSoftCopies: emailingAddressForSoftCopies,
          joiningDate: joiningDate,
        });

        const addContractor = await newUser.save();
        sendPasswordToUser(addContractor?.email, password);
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
};

const contractorData = async (req, res) => {
  const { q } = req.query;

  const filter = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
    role: "Contractor",
  };
  const projection = {
    name: 1,
    email: 1,
    contractorRate: 1,
    phoneNumber: 1,
    identificationNumber: 1,
  };
  try {
    const contractor = await User.find(filter, projection).sort({ name: 1 });
    res.status(200).json({
      success: true,
      message: "All contractors data",
      contractor,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something wents wrong",
      error,
    });
  }
};

export { createContractor, contractorData };

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
