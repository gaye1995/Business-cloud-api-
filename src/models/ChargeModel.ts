import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
    exploitation: [{
        userExpenseNum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'expense',
        }
    }],
    totalI: {
        type: Number,
    },
    financier: [{
        userExpenseNum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'expense',
        }
    }],
    totalII: {
        type: Number,
    },
    exceptionnelle: [{
        userExpenseNum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'expense',
        }
    }],
    totalIII: {
        type: Number,
    },
    totalCharge: {
        type: Number,
    },
}, { timestamps: true });

const Charge = mongoose.model('charge', chargeSchema);

export { Charge };
