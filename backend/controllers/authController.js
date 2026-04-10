const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOtp, transporter } = require("../utils/email");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email, and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email or username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to register user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", req.body.email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    console.log("OTP:", otp);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Your OTP",
        text: `Your OTP is ${otp}`,
      });
    } catch (err) {
      console.error("Email failed:", err.message);
    }

    return res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or OTP" });
    }

    if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const payload = {
      user: { id: user.id, username: user.username, email: user.email },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ success: true, message: "OTP verified", token });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to verify OTP" });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp.toString();
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log("OTP:", otp);

    try {
      await sendOtp({ to: email, otp });
    } catch (mailError) {
      console.error("Resend email error:", mailError);
    }

    return res.json({
      success: true,
      message:
        "OTP resent. Check console for the code if email delivery fails.",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to resend OTP" });
  }
};
