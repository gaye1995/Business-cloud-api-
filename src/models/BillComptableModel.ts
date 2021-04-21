import mongoose from 'mongoose';

const billComptableSchema = new mongoose.Schema({
    billNum: {
        type: String,
        required: [true],
    },
    status: {
        type: String,
        required: [true],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
    },
    entrepriseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
    },
    services: [{
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'service',
        },
        duree: {
            type: Number,
        }
    }],
    tva: {
        type: Number,
    },
    taxe: {
        type: Number,
    },
    currency: {
        type: Number,
    },
    totalTTC: {
        type: Number,
    },
    totalHT: {
        type: Number,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    payementDate: {
        type: Date,
    },
    deadline: {
        type: Date,
        required: [true],
    },
}, { timestamps: true });

const BillComptable = mongoose.model('billComptable', billComptableSchema);

export { BillComptable };
