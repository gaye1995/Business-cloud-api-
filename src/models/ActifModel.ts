import mongoose from 'mongoose';

const actifSchema = new mongoose.Schema({
    actifNum: {
        type: String,
        required: [true],
    },
    articleId: {
            type: mongoose.Schema.Types.ObjectId,
    },
    billId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    totalTTC: {
        type: Number,
    },
    actifDate: {
        type: Date,
    },
}, { timestamps: true });

const Actif = mongoose.model('actif', actifSchema);

export { Actif };
