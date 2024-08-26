import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Document = mongoose.model('Document', DocumentSchema)

export default Document;