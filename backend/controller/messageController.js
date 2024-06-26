import Message from "../models/messageSchema.js";

export const sendMessage = async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
    try {
        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "please fill all fields",
            });
        }

        const newMessage = await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success: true,
            message: "message sent successfully",
            newMessage,
        });

    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({
            error:"Error internal server",
            message: error.message,
        })
    }
};
