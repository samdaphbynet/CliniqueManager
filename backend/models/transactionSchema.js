import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: String,
        required: true
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction;
