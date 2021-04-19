import mongoose from 'mongoose';

const actifSchema = new mongoose.Schema({
    immobilisation: [{
        _id: false,
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
        },
        quantity: {
            type: Number,
        },
    }],
    totalI: {
        type: Number,
    },
    creance: [{
        _id: false,
        billId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bill',
        },
    }],
    totalII: {
        type: Number,
    },
    disponibilite: [{
        disponibilite: Number,
    }],
    totalIII: {
        type: Number,
    },
    totalActif: {
        type: Number,
    },
    actifDate: {
        type: Date,
    },
}, { timestamps: true });

const Actif = mongoose.model('actif', actifSchema);

export { Actif };
