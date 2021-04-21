import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
    },
    price: {
        type: Number,
        required: [true],
    },
    accountNumber: {
        type: Number,
        required: [true],
    },
    description: {
        type: String,
    },
}, { timestamps: true });

const Service = mongoose.model('service', serviceSchema);

export { Service };