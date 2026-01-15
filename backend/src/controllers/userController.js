const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail,
} = require("../utils/emailService");

// Register user (Send OTP)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, preferences } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existingUser && !existingUser.isVerified) {
      // Update existing unverified user
      existingUser.name = name;
      existingUser.passwordHash = password;
      existingUser.preferences = preferences || [];
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();

      // Send OTP email
      await sendOTPEmail(email, otp, name);

      return res.status(200).json({
        message: "OTP sent to your email",
        userId: existingUser._id,
        email: existingUser.email,
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      passwordHash: password,
      preferences: preferences || [],
      isVerified: false,
      otp,
      otpExpires,
    });

    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp, name);

    if (!emailResult.success) {
      return res
        .status(500)
        .json({ error: "Failed to send OTP email. Please try again." });
    }

    res.status(201).json({
      message: "OTP sent to your email",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ error: "userId and otp are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "User already verified" });
    }

    if (!user.otp || !user.otpExpires) {
      return res
        .status(400)
        .json({ error: "OTP not found. Please register again." });
    }

    if (new Date() > user.otpExpires) {
      return res
        .status(400)
        .json({ error: "OTP expired. Please request a new one." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "User already verified" });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await sendOTPEmail(user.email, otp, user.name);

    res.json({
      message: "OTP sent to your email",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        error: "Email not verified. Please verify your email first.",
        userId: user._id,
        needsVerification: true,
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name || undefined,
        preferences: preferences || undefined,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
