import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";

// register user controller
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }

    // Handle file upload logic here if necessary
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "File is missing" });
    }
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // check if the user already exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    // if not then
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "Account created successfully." });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

// login user controller
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }

    // check if the user already exist or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // matching password to validate user
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // check if role is correct or not
    if (role !== user.role) {
      console.log("Role mismatch:", { expected: user.role, received: role });
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with current role.",
      });
    }

    // generating token to validate user
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevent client-side JS access
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Adjust for cross-domain dev
      })
      .json({ success: true, message: `Welcome back ${user.fullName}`, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

// logout user controller
export const logoutUser = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        maxAge: 0, // Expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, skills, bio } = req.body; // Fixed

    // Handle file upload logic here if necessary
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "File is missing" });
    }
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Set by middleware
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Update user data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      user.password = hashedPassword;
    }

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({ success: true, user, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
