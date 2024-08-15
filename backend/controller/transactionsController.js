import Transaction from "../models/transactionSchema.js";

// function that add new transaction
export const transaction = async (req, res) => {
    // create new transaction document
    try {
        const {user, date, cost} = req.body;
        if (!user || !date || !cost) {
            return res.status(404).json({success: false, message: "All fields are required"})
        }
        const newTransaction = await Transaction.create({
            user,
            date,
            cost
        })
        res.status(200).json({
            success: true,
            message: "Transaction added successfully",
            data: newTransaction
        })
    } catch (error) {
        console.log("Error creating transaction", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// function that get all transactions
export const getAllTransaction = async (req, res) => {
    try {
        const allTransactions = await Transaction.find();
        if (allTransactions.length < 1) {
            return res.status(404).json({success: false, message: "No transactions found"})
        }
        res.status(200).json({
            success: true,
            data: allTransactions
        })
    } catch (error) {
        console.log("Error getting all transactions", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}