import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).json({
      success: false,
      message: "User already exist",
    });
  } else {
    if (name && email && password && role) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          name: name,
          email: email,
          password: hashPassword,
          role: role,
        });
        await newUser.save();

        const saveUser = await User.findOne({ email: email });
        const token = jwt.sign(
          { userId: saveUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "100d" }
        );
        res.status(200).json({
          success: true,
          message: "Signup successful",
          userID: saveUser._id,
          name: saveUser.name,
          email: saveUser.email,
          role: saveUser.role,
          token: token,
        });
      } catch (error) {
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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email == email && isMatch) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "100d",
          });

          res.status(200).json({
            success: true,
            message: "Logedin Successfully",
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "email and password is not matched",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "User is not registered",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please fill empty fields",
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const allAdmins = async (req, res) => {
  try {
    const admin = await User.find({ role: "Admin" }).select("-password");

    res.status(200).json({
      success: true,
      message: "All users",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Users not found",
      admin,
    });
  }
};

export { Signup, Login, allAdmins };
