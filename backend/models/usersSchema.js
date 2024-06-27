import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const usersSchema = new mongoose.Schema({
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
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartement: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

usersSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
})

usersSchema.methods.comparePassword = async function(entrePassword) {
    return await bcrypt.compare(entrePassword, this.password)
}

const User = mongoose.model("User", usersSchema)

export default User;