import mongoose from 'mongoose';

const passifSchema = new mongoose.Schema({
    passifNum: {
        type: String,
        required: [true],
    },
    userExpenseNum: {
        type: mongoose.Schema.Types.ObjectId,
    },
    totalTTC: {
        type: Number,
    },
    bilanDate: {
        type: Date,
    },
}, { timestamps: true });

const Passif = mongoose.model('passif', passifSchema);

export { Passif };
