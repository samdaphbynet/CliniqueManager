import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
        unique: false,
        validate: [validator.isEmail, "invalid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [9, "phone must be greater or equal 9 characters"],
        maxLength: [13, "phone must be less or equal 13 characters"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "message must be greater or equal 10 characters"]
    }
})

const Message = mongoose.model("Message", messageSchema);

export default Message;