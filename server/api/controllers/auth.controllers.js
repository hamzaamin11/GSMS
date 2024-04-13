// importing required packages and modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// importing required mongodb schema models
const User = require("../models/user.model");

// signin user => admin or eomployee and generate jwt Token
const signin = async (req, res, next) => {
  const { civilId, password } = req.body;
  // console.log(req.body);
  try {
    let user = await User.findOne({ civilId });
    if (!user) {
      return res.status(400).json({
        type: "ALERT",
        message: "Incorrect Civil ID & Password combination",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        type: "ALERT",
        message: "Incorrect Civil ID & Password combination",
      });
    }

    const payload = {
      civilId: user.civilId,
      userId: user._id,
      systemRole: user.systemRole,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 24 * 60 * 60 }, // 1 day in seconds
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          messages: `Auth Successful.`,
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signin,
};
