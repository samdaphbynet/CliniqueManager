import Appointment from "../models/appointmentSchema.js";
import Doctor from "../models/doctorSchema.js";
import User from "../models/usersSchema.js";


// function to create a new appointment
export const appointControle = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    birth,
    gender,
    appointment,
    department,
    doctor_firstName,
    doctor_lastName,
    address,
    hasVisited,
  } = req.body;
  try {
    // check if all fields are valid


    if (!firstName || !lastName || !email || !phone || !address || !appointment  || !birth || !gender || !department) {
      return res.status(400).json({
        message: "Please enter a valid appointment",
      });
    }

    if (!doctor_lastName || !doctor_firstName ) {
      return res.status(400).json({
        message: "doctor_firstName ou doctor_lastName",
      });
    }

    // check if the doctor exist in the database
    const doctorExist = await Doctor.findOne({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
    });
    if (!doctorExist) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    
    // create a new appointement
    const newAppointement = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      birth,
      gender,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      appointment,
      department,
      address,
      hasVisited,
      doctorId: doctorExist._id,
      patientId: req.user._id,
    });
    res.status(200).json({
      success: true,
      message: "Appointment created successfully",
      newAppointement,
    });
  } catch (error) {
    console.log("Error in appointControle: ", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
};


// get all appointment 
export const getAllAppointment = async (req, res) => {
    try {
        // find all appointments in the database and return them as json response
        const appointment = await Appointment.find();
        if (appointment.length < 1) {
            return res.status(404).json({message: "No appointments found"});
        }
        res.status(200).json({
            success: true,
            message: "All appointments fetched successfully",
            appointment,
        });
    } catch (error) {
        console.log("Error in getAllAppointment: ", error);
        res.status(500).json({
            error: "Error internal server",
            message: error.message,
        });
    }
}

// update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
    try {
        // find the appointment by id
        let appointment = await Appointment.findById(id);
        // check if the appointment is already exists
        if (!appointment) {
          return res.status(404).json({message: "Appointment not found"});
        }
        // update the appointment fields
        appointment = await Appointment.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment,
        });
    } catch (error) {
        console.log("Error updating appointment", error);
        res.status(500).json({
            error: "Error internal server",
            message: error.message,
        });
    }
}

// delete appointment
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    // find the appointment by id
    let appointment = await Appointment.findById(id);
    // check if the appointment is already exists
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    // delete the appointment from the database
    appointment = await Appointment.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      appointment,
    });
  } catch (error) {
    console.log("Error deleting appointment:", error);
    res.status(500).json({
      error: "Error internal server",
      message: error.message,
    });
  }
}