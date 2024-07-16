import mongoose from 'mongoose';
import validator from 'validator';

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "invalid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [9, "phone must be greater or equal 9 characters"],
        maxLength: [13, "phone must be less or equal 13 characters"],
    },
    birth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    appointment: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    hasVisited: {
        type: Boolean,
        default: false,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled"],
        default: "pending",
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
