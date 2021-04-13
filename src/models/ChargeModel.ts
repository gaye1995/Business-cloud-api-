import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
    exceptionnel: [{
        userExpenseNum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
        },
        MontantTTC: {
            type: Number,
        },
    }],
    totalTTC: {
        type: Number,
    },
}, { timestamps: true });

const Charge = mongoose.model('charge', chargeSchema);

export { Charge };
