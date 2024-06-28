import Message from "../models/messageSchema.js";

export const sendMessage = async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
    try {
        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({message: "please fill all fields"});
        }
        const newMessage = await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success: true,
            message: "message sent successfully",
            newMessage,
        });

    } catch (error) {
        console.log("Error in sendMessage", error.message);
        let type = error.message.split(":")[1];
        let msg = error.message.split(":")[2];
        res.status(500).json({
            error:"Error internal server",
            message: error.message,
            type,
            msg,
        })
    }
};

// get all messages
export const getAllMessages = async (req, res) => {
    const allMessage = await Message.find();
    if (allMessage.length < 1) {
        return res.status(404).json({message: "No messages found"});
    }

    res.status(200).json({
        success: true,
        message: "All messages fetched successfully",
        allMessage,
    });
}