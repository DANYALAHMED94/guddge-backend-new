import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
            expiresIn: "15d",
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

const LoginByMSOffice = async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    try {
      let password = email + process.env.JWT_SECRET;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      let newUser = new User({
        name: name,
        email: email,
        role: role,
        password: hashPassword,
      });
      await newUser.save();

      const userAuth = await User.findOne({ email: email });
      const token = jwt.sign({ userId: userAuth._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({
        success: true,
        message: "Logedin Successfully",
        userId: userAuth._id,
        name: userAuth.name,
        email: userAuth.email,
        role: userAuth.role,
        token: token,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Something wents wrong",
        error,
      });
    }
  } else {
    if ((name && email, role)) {
      const userAuth = await User.findOne({ email: email });
      const token = jwt.sign({ userId: userAuth._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({
        success: true,
        message: "Logedin Successfully",
        userId: userAuth._id,
        name: userAuth.name,
        email: userAuth.email,
        role: userAuth.role,
        token: token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something wents wrong",
      });
    }
  }
};

const allAdmins = async (req, res) => {
  const { q } = req.query;

  const filter = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
    role: "Admin",
  };

  try {
    const admin = await User.find(filter).select("-password").sort({ name: 1 });

    res.status(200).json({
      success: true,
      message: "All users",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Users not found",
    });
  }
};

const allUsersDateOfBirth = async (req, res) => {
  const { q } = req.query;
  const projection = {
    name: 1,
    role: 1,
    DOB: 1,
    filename: 1,
  };
  const filter = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
    DOB: { $exists: true },
  };
  try {
    const birthday = await User.find(filter, projection);
    res.status(200).json({
      success: true,
      message: "All users birthdays",
      birthday,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Users not found",
    });
  }
};

const allBirthDayEvents = async (req, res) => {
  try {
    const birthday = await User.find();
    res.status(200).json({
      success: true,
      message: "All users birthdays",
      birthday,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Users not found",
    });
  }
};

const allContractors = async (req, res) => {
  const { q } = req.query;

  const filter = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
    role: "Admin",
  };

  try {
    const projection = {
      name: 1,
      role: 1,
    };
    const contractors = await User.find({ role: "Contractor" }, projection);

    res.status(200).json({
      success: true,
      message: "All contractors",
      contractors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something wents wrong",
    });
  }
};

const clientRates = async (req, res) => {
  try {
    const clients = await User.find({ role: "Client" }).select("-password");

    res.status(200).json({
      success: true,
      message: "All clients",
      clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something wents wrong",
    });
  }
};

const allClients = async (req, res) => {
  try {
    const projection = {
      name: 1,
      role: 1,
    };
    const clients = await User.find({ role: "Client" }, projection);

    res.status(200).json({
      success: true,
      message: "All Clients",
      clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something wents wrong",
    });
  }
};

const changePasswordAndUpdate = async (req, res) => {
  const { email, oldPassword, new_password } = req.body;

  const user = await User.find({ email: email });

  if (user) {
    const isMatch = await bcrypt.compare(oldPassword, user[0].password);

    if (isMatch) {
      try {
        if (oldPassword && new_password && oldPassword !== new_password) {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(new_password, salt);
          await User.findByIdAndUpdate(user[0]._id, {
            password: newHashPassword,
          });

          res.status(201).json({
            success: true,
            message: "Password Updated Successfully",
            data,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "your password is same as previous password",
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Old password is not correct",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "user not found",
    });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    DOB,
    phoneNumber,
    jobTitle,
    joiningDate,
    totalYearExperince,
    guddgeEmailPlan,
    agreement,
    agreementEndDate,
    companyName,
    shore,
    contractorRate,
    identificationNumber,
    socialSecurityNumber,
    mailingAddress,
    emailingAddressForSoftCopies,
    clientRate,
    contractorId,
  } = req.body;

  const user = await User.findById(id);
  if (user) {
    (user.name = name || user.name),
      (user.email = email || user.email),
      (user.DOB = DOB || user.DOB),
      (user.phoneNumber = phoneNumber || user.phoneNumber);
    user.clientRate = clientRate || user.clientRate;
    user.contractorId = contractorId || user.contractorId;
    user.jobTitle = jobTitle || user.jobTitle;
    user.joiningDate = joiningDate || user.joiningDate;
    user.totalYearExperince = totalYearExperince || user.totalYearExperince;
    user.guddgeEmailPlan = guddgeEmailPlan || user.guddgeEmailPlan;
    user.agreement = agreement || user.agreement;
    user.agreementEndDate = agreementEndDate || user.agreementEndDate;
    user.shore = shore || user.shore;
    user.contractorRate = contractorRate || user.contractorRate;
    user.companyName = companyName || user.companyName;
    user.identificationNumber =
      identificationNumber || user.identificationNumber;
    user.socialSecurityNumber =
      socialSecurityNumber || user.socialSecurityNumber;
    user.mailingAddress = mailingAddress || user.mailingAddress;
    user.emailingAddressForSoftCopies =
      emailingAddressForSoftCopies || user.emailingAddressForSoftCopies;

    try {
      await user.save();
      const updatedUser = await User.findById(id).select("-password");
      res.status(200).json({
        success: true,
        message: "updated Successfully",
        updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something wents wrong while updating user",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "Users not found",
    });
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wents wrong while updating user",
    });
  }
};

export {
  Signup,
  Login,
  allAdmins,
  allUsersDateOfBirth,
  LoginByMSOffice,
  allContractors,
  allBirthDayEvents,
  clientRates,
  allClients,
  changePasswordAndUpdate,
  editUser,
  findUserById,
};
