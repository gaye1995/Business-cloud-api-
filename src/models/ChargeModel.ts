import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
    userExpenseNum: {
        type: mongoose.Schema.Types.ObjectId,
    },
    totalTTC: {
        type: Number,
    },
}, { timestamps: true });

const Charge = mongoose.model('charge', chargeSchema);

export { Charge };
