import path from "path";
import express from "express";
import multer from "multer";
import User from "../model/userModel.js";
import fs from "fs";

const pdfRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdfUploads/");
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
pdfRoute.put("/pdfUpload", upload.single("pdfFile"), (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).send("Choose a PDF file.");
      return;
    }

    res.send("File uploaded successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default pdfRoute;

const removeImage = (file) => {
  fs.unlink("./pdfUploads/" + file, function (err) {
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
