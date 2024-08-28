import User from "../models/usersSchema.js";
import Doctor from "../models/doctorSchema.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import cloudinary from 'cloudinary';

// Create a new User object
export const patientRegister = async (req, res) => {
  const { firstName, lastName, email, phone, birth, gender, password, role } =
    req.body;
  try {
    if ( !firstName || !lastName || !email || !phone || !birth || !gender || !password || !role ) {
      return res.status(404).json({ message: "please fill all fields", });
    }

    // check if email already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "user already exist", });
    }

    // create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      birth,
      gender,
      password,
      role,
    });
    const token = generateTokenAndSetCookie(newUser, res)
    res.status(200).json({
      success: true,
      message: "user created successfully",
      newUser,
      token
    });
  } catch (error) {
    console.log("Error in patientRegister controller: ", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
};

// Login user with password and username
export const login = async (req, res) => {
    const {email, password, confirmPassword, role} = req.body;
    try {
        if (!email ||!password ||!confirmPassword ||!role) {
          return res.status(400).json({message: "please fill all fields",});
        }

        if (password !== confirmPassword) {
          return res.status(400).json({message: "password and confirm password do not match",});
        }

        const user = await User.findOne({email}).select("+password")
        if (!user) {
            return res.status(401).json({message: "Invalid Email ou Password",})
        }

        const isPasswordMatched = await user.comparePassword(password)
        if (!isPasswordMatched) {
            return res.status(401).json({message: "Invalid password or email",})
        }

        if (role !== user.role) {
          return res.status(403).json({message: "User with this role not found!",})
        }

        const token = generateTokenAndSetCookie(user, res)
        res.status(200).json({
            success: true,
            message: "user logged with successfully",
            user: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              birth: user.birth,
              gender: user.gender,
              role: user.role,
            },
            token
        })
    } catch (error) {
        console.log("Error in login controller: ", error);
        res.status(500).json({
            error: "Error internal server",
            message: error.message,
        });
    }
}

// add new Admin account
export const addNewAdmin = async (req, res) => {
  const { firstName, lastName, email, phone, birth, gender, password } = req.body;
  try {
    if ( !firstName || !lastName || !email || !phone || !birth || !gender || !password) {
      return res.status(404).json({message: "please fill all fields"});
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({message: "user already exist"});
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      birth,
      gender,
      role: "Admin"
    })
    
    const token = generateTokenAndSetCookie(newUser, res)

    res.status(200).json({
      success: true,
      message: "new admin user created successfully",
      newUser,
      token
    });
  } catch (error) {
    console.log("Error in addNewAdmin: ", error)
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// get admin information
export const getAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "No user information admin available",
      });
    }
    res.status(200).json({
      success: true,
      message: "Admin information fetched successfully",
      user: req.user
    });
  } catch (error) {
    console.log("Error in getAdmin: ", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// get Patient information
export const getPatient = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "No user information available",
      });
    }
    res.status(200).json({
      success: true,
      message: "Patient information fetched successfully",
      user: req.user
    });
  } catch (error) {
    console.log("Error in getPatient: ", error);
    res.status(500).json({
      success: false,
      error: "Error internal server",
      message: error.message,
    });
  }
}

// get all patients information
export const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({role: "Patient"})
    res.status(200).json({
      success: true,
      message: "All Patients fetched successfully",
      patients
    });
  } catch (error) {
    console.log("Error in getAllPatients", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({role: "Doctor"})
    res.status(200).json({
      success: true,
      message: "All Doctors fetched successfully",
      doctors
    });
  } catch (error) {
    console.log("Error in getallDoctors", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// delete doctor by id
export const deleteDoctor = async (req, res) => {
  const { id } = req.params
  try {
    let doctor = await Doctor.findById(id)
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      doctor
    });
  } catch (error) {
    console.log("Error in deleteDoctor: ", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// Logout admin
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("AdminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "None",
    });
    res.status(200).json({
      success: true,
      message: "admin logged out successfully",
    });
  } catch (error) {
    console.log("Error in logoutAdmin: ", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// logout Patient
export const logoutPatient = async (req, res) => {
  try {
    res.clearCookie("PatientToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "None",
    });
    res.status(200).json({
      success: true,
      message: "patient logged out successfully",
    });
  } catch (error) {
    console.log("Patient logout failed", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// add new Doctor
export const addNewDoctor = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No file uploaded doctor avatar Required!" });
    }

    // check if the file has the correct format
    const {docAvatar} = req.files;
    const allowedFormat = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
    if (!allowedFormat.includes(docAvatar.mimetype)) {
      return res.status(400).json({ message: "Invalid file format, only.png,.jpeg,.jpg,.webp are allowed!" });
    }

    const {firstName, lastName, email, phone, birth, gender, doctorDepartement, password } = req.body;

    // Check if the information doctor is available
    if (!firstName || !lastName || !email || !phone || !birth || !gender || !doctorDepartement || !password) {
      return res.status(404).json({ message: "please fill all fields"});
    }

    const existEmail = await Doctor.findOne({email});
    if (existEmail) {
      return res.status(404).json({ message: "doctor with this email already exist"});
    }

    // Save the doctor avatar
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "Error uploading doctor avatar to cloudinary" });
    }

    const newDoctor = await Doctor.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      birth,
      gender,
      doctorDepartement,
      role: "Doctor",
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      }
    })

    res.status(200).json({
      success: true,
      message: "New Doctor created successfully",
      newDoctor,
    });

  } catch (error) {
    
  }
}

// update doctor information by id
export const updateDoctor = async (req, res) => {
  const { id } = req.params
  try {
    let doctor = await Doctor.findById(id)
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { firstName, lastName, email, phone, birth } = req.body;
    // check if the email already existing
    if (email) {
      const existEmail = await Doctor.findOne({email, _id: {$ne: id}});
      if (existEmail) {
        return res.status(404).json({ message: "A doctor with this email already exist"});
      }
    }

    if (firstName) doctor.firstName = firstName;
    if (lastName) doctor.lastName = lastName;
    if (email) doctor.email = email;
    if (phone) doctor.phone = phone;
    if (birth) doctor.birth = birth;
    await doctor.save();
    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
    
  } catch (error) {
    console.log("Error in update doctor controller", error)
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}

// find doctor by id 
export const findDoctorById = async (req, res) => {
  const { id } = req.params
  try {
    const doctor = await Doctor.findById(id)
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully",
      doctor,
    });
  } catch (error) {
    
  }
} 