const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

const User = require("../models/User");


// OTP STORE

let otpStore = {};


// GMAIL TRANSPORTER

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});


// SIGNUP

router.post("/signup", async (req, res) => {

  try {

    const {
  name,
  email,
  password,
  role,
  skills,
  bio,
  experience
} = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({

  name,
  email,
  password: hashedPassword,
  role,
  skills,
  bio,
  experience

});

    return res.status(201).json({

      message: "Signup successful",

      user

    });

  } catch(error){

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }

});


// LOGIN

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      "studyconnectsecret",

      {
        expiresIn: "7d"
      }

    );

    return res.status(200).json({

      message: "Login successful",

      token,

      user

    });

  } catch(error){

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }

});


// SEND OTP

router.post("/send-otp", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message: "User not found"
      });

    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    otpStore[email] = otp;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "StudyConnect OTP Verification",

      text: `Your OTP is ${otp}`

    });

    return res.status(200).json({

      message: "OTP sent successfully"

    });

  } catch(error){

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }

});


// VERIFY OTP + RESET PASSWORD

router.post("/verify-otp", async (req, res) => {

  try {

    const { email, otp, password } = req.body;

    if(otpStore[email] != otp){

      return res.status(400).json({
        message: "Invalid OTP"
      });

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.findOne({ email });

    user.password = hashedPassword;

    await user.save();

    delete otpStore[email];

    return res.status(200).json({

      message: "Password reset successful"

    });

  } catch(error){

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;