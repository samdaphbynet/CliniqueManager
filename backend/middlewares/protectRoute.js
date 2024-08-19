import User from "../models/usersSchema.js";
import jwt from "jsonwebtoken";

// function that protect the admin using cookies
export const protectAdmin = async (req, res, next) => {
  try {
    // check if the token is existing in cookies
    const token = req.cookies.AdminToken;
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "No token Admin, authorization denied",
        });
    }

    // decoded token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token is not valid" });
    }
    // find user by id
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // attach user to req object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectAdmin: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// function that protect the user using cookies
export const protectPatient = async (req, res, next) => {
  try {
    const token = req.cookies.PatientToken;
    console.log("token: ", token);
    // check if the token is existed
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "No token Patient, authorization denied",
        });
    }

    // decoded token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded: ", decoded)
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token is not valid" });
    }

    // find user by id
    const user = await User.findById(decoded.id).select("-password");
    console.log("user: ", user)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // attach user to req object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectPatient: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
