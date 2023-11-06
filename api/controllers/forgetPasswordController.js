const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Define a POST route for sending reset emails

const otpData = {};

const sendEmail = async (req, res) => {
  const { email } = req.body;

  // Create a Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail' or your SMTP settings
    auth: {
      user: 'reservoph@gmail.com',
      pass: 'sfrs ieto hthg hmxb',
    },
  });

  //Generate OTP Code
  let string = '0123456789';
  let OTP = '';

  let len = string.length;
  for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
  }

  // Store OTP and creation timestamp
  const timestamp = Date.now(); // Current timestamp
  otpData[email] = { otp: OTP, timestamp };

  // Create the email message
  const mailOptions = {
    from: 'reservoph@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Your verification code is:</p><h2>${OTP}</h2><p>This code will expire in 5 minutes!</p><p>If you did not initiate this, you can safely ignore this message.</p>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}

const validateOTP = (req, res) => {
  const { email, userOTP } = req.body;

  if (otpData[email]) {
    const { otp, timestamp } = otpData[email];
    const currentTime = Date.now();

    // Check if the OTP is correct and within the time limit (e.g., 5 minutes)
    if (userOTP === otp && currentTime - timestamp <= 5 * 60 * 1000) {
      res.status(200).json({ message: 'OTP is valid', success:true});
    } else {
      res.status(200).json({ message: 'Invalid or expired OTP',success:false});
    }
  } else {
    res.status(200).json({ message: 'OTP not found',success:false });
  }
};

module.exports = {
  sendEmail,
  validateOTP
}