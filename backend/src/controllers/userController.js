const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");

// Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, walletAddress, userType, organization } = req.body;
    
    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { walletAddress }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      walletAddress: walletAddress.toLowerCase(),
      userType,
      organization
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        walletAddress: user.walletAddress,
        userType: user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success response
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name, 
        email, 
        walletAddress, 
        userType,
        organization 
      } 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { walletAddress, signature, message } = req.body;
    
    // Find user by wallet address
    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify wallet signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        walletAddress: user.walletAddress,
        userType: user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success response
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletAddress: user.walletAddress,
        userType: user.userType,
        organization: user.organization
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error fetching profile" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, organization } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.organization = organization || user.organization;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      walletAddress: updatedUser.walletAddress,
      userType: updatedUser.userType,
      organization: updatedUser.organization
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Server error updating profile" });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
};
