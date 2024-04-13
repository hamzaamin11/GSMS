// importing required packages and modules
const bcrypt = require("bcrypt");

// importing required mongodb schema models
const User = require("../models/user.model");

// load logged in user
const loadUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password -__v -documents"
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "ALERT", message: "Error occurred while signing in." });
  }
};

// create a user
const createAccount = async (req, res, next) => {
  const {
    name,
    dob,
    civilId,
    phone,
    gpa,
    schoolName,
    program,
    password,
    systemRole,
  } = req.body;

  // console.log(req.body);

  try {
    const user = await User.findOne({ civilId });

    // if user with civilId provided by client already exists => return a response
    if (user) {
      return res
        .status(409)
        .json({ type: "ALERT", message: "User with Civil ID already exists" });
    }

    // if user with civilId provided by client doesn't already exists
    // proceed to add new user
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // prepare object
    let userFields = {};
    userFields.name = name;
    userFields.dob = dob;
    userFields.civilId = civilId;
    userFields.phone = phone;
    userFields.gpa = gpa;
    userFields.schoolName = schoolName;
    userFields.program = program;
    userFields.password = encryptedPassword;
    if (systemRole) userFields.systemRole = systemRole;

    let newUser = new User(userFields);

    newUser = await newUser.save();
    res.status(201).json({
      type: "ALERT",
      message: `${newUser.name} created successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Failed to save. Internel Server Error",
    });
  }
};

const submitApplication = async (req, res, next) => {
  const { userId } = req.user;
  try {
    
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { submitted: true },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Failed to save. Internel Server Error",
    });
  }
};

const addUser = async (req, res, next) => {
  try {
    const user = req.body;

    let existingUser = await User.findOne({ civilId: user.civilId });

    if (existingUser)
      return res
        .status(409)
        .json({ type: "ALERT", message: "User with Email already exists" });

    let newUser = new User(user);
    await newUser.save();

    return res.status(201).json({
      message: `SUCESS: User ${newUser.name} added.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Failed to save. Internel Server Error",
    });
  }
};

module.exports = {
  createAccount,
  addUser,
  loadUser,
  submitApplication,
};
