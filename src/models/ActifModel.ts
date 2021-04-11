import mongoose from 'mongoose';

const actifSchema = new mongoose.Schema({
    actifImmobilisee: [{
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
        },
        quantity: {
            type: Number,
        },
        MontantTTC: {
            type: Number,
        },
    }],
    creance: [{
        billId: {
            type: mongoose.Schema.Types.ObjectId,
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
