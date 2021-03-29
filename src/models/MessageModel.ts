import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
    },
    text: {
        type: String,
        required: [true],
    }
}, { timestamps: true });

const Message = mongoose.model('conversation', messageSchema);

export { Message };