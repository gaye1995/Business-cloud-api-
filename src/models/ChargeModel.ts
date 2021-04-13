import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
    exploitation: [{
        userExpenseNum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'expense',
        }
    }],
    totalTTC: {
        type: Number,
    },
}, { timestamps: true });

const Charge = mongoose.model('charge', chargeSchema);

export { Charge };
