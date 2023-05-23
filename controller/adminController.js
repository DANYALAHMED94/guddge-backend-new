import User from "../model/userModel.js";

const createAdmin = async (req, res) => {
  const { name, email, phoneNumber, DOB } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (name && email && phoneNumber && DOB) {
      try {
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.DOB = DOB || user.DOB;

        await user.save();

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
      message: "Admin do not exist against this email",
    });
  }
};

export { createAdmin };
