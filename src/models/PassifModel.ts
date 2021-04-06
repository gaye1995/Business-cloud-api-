import mongoose from 'mongoose';

const pactifSchema = new mongoose.Schema({
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

const Pactif = mongoose.model('pactif', pactifSchema);

export { Pactif };
