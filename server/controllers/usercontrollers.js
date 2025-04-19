import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { genarateToken } from "../utils/token.js";

const NODE_ENV = process.env.NODE_ENV || "development"; // Make sure this is defined

export const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const profilePicUrl = `/uploads/profilePics/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: profilePicUrl },
      { new: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const userSignup = async (req, res, next) => {
  try {
    console.log("Signup route hit");
    const { name, email, password, mobile, profilepic } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❌ Typo fix: findone → findOne
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // ✅ Create user
    const userData = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      profilepic,
    });

    await userData.save();

    // ✅ Generate token
    const token = genarateToken(userData._id);

    // ✅ Set cookie
    // res.cookie("token", token);
    res.cookie("token", token, {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: true,
    });

    return res.status(201).json({ data: userData, message: "User account created" });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error"
    });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    console.log("login route hit");
    const { email, password } = req.body;

    // ✅ Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❌ Typo fix: findone → findOne
    const UserExist = await User.findOne({ email });

    if (!UserExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // ✅ Hash password
    const passwordMatch = bcrypt.compareSync(password, UserExist.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "user not authenticated" });
    }

    // ✅ Generate token
    const token = genarateToken(UserExist._id);

    // ✅ Set cookie
    // res.cookie("token", token);
    res.cookie("token", token, {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: true,
    });

    //delete UserExist.doc.password;
    {
      const { password, ...userDataWithoutpassword } = UserExist._doc;
      return res.json({ data: userDataWithoutpassword, message: "user login sucuess" });
    }

  } catch (error) {
    console.error("Login error:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error"
    });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId).select("-password");
    return res.json({ data: userData, message: "user Profile fetched" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error"
    });
  }
};


export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: true,
    });
    return res.json({ message: "user Logout success" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error"
    });
  }
};