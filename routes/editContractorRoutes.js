import path from "path";
import express from "express";
import multer from "multer";
import User from "../model/userModel.js";
import fs from "fs";
import bcrypt from "bcryptjs";

const editPdfRoute = express.Router();

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
editPdfRoute.put(
  "/pdfupload-edit/:id",
  upload.single("agreement"),
  async (req, res) => {
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
    const { id } = req.params;
    const user = await User.findById(id);
    const oldFilePath = `./${user?.agreement}`;
    if (user) {
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      try {
        (user.name = name || user.name),
          (user.email = email || user.email),
          (user.jobTitle = jobTitle || user.jobTitle),
          (user.phoneNumber = phoneNumber || user.phoneNumber),
          (user.DOB = DOB || user.DOB),
          (user.contractorRate = contractorRate || user.contractorRate),
          (user.totalYearExperince =
            totalYearExperince || user.totalYearExperince),
          (user.guddgeEmailPlan = guddgeEmailPlan || user.guddgeEmailPlan),
          (user.agreement = req?.file?.path ?? user.agreement),
          (user.shore = shore || user.shore),
          (user.agreementEndDate = agreementEndDate || user.agreementEndDate),
          (user.companyName = companyName || user.companyName),
          (user.identificationNumber =
            (await encrypt(identificationNumber)) || user.identificationNumber),
          (user.socialSecurityNumber =
            (await encrypt(socialSecurityNumber)) || user.socialSecurityNumber),
          (user.mailingAddress = mailingAddress || user.mailingAddress),
          (user.alternativeEmailAdress =
            alternativeEmailAdress || user.alternativeEmailAdress),
          (user.joiningDate = joiningDate || user.joiningDate),
          await user.save();

        res.status(200).json({
          success: true,
          message: "Contractor Updated successfully",
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
        message: "User not found",
      });
    }
  }
);

export default editPdfRoute;

const removeImage = (file) => {
  fs.unlink("./pdfuploads/" + file, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });
};
const encrypt = async (text) => {
  const salt = await bcrypt.genSalt(16);
  const hashdata = await bcrypt.hash(text, salt);
  return hashdata;
};
