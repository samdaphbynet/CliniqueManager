import mongoose from 'mongoose';
import validator from 'validator';

const DoctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "first name must be greater 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "last name must be greater 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "invalid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [9, "phone must be greater or equal 9 characters"],
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
    password: {
        type: String,
        required: true,
        minLength: [6, "password must be greater or equal 6 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
    },
    doctorDepartement: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;