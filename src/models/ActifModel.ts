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
    creance: [{
        _id: false,
        billId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bill',
        },
    }],
    disponibilite: [{
        disponibilite: Number,
    }],

    totalActif: {
        type: Number,
    },
    actifDate: {
        type: Date,
    },
}, { timestamps: true });

const Actif = mongoose.model('actif', actifSchema);

export { Actif };
