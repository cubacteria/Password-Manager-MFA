const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async ({ to, otp }) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Your Password Manager OTP",
    text: `Your one-time verification code is: ${otp}. It expires in 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtp, transporter };
