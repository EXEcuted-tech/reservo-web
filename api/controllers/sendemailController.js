const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Define a POST route for sending reset emails
router.post(`../../../api/controllers`, async (req, res) => {
  const { email } = req.body;

  // Create a Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail' or your SMTP settings
    auth: {
      user: 'reservoph@gmail.com',
      pass: 'sfrs ieto hthg hmxb',
    },
  });

  // Create the email message
  const mailOptions = {
    from: 'reservoph@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: 'Here is your password reset link...',
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

module.exports = router;