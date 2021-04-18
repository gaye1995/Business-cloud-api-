import mongoose from 'mongoose';

const passifSchema = new mongoose.Schema({
    capitauxPropres: [{
        _id: false,
        capital: {
            type: Number
        },
        resultat: {
            type: Number,
        }
    }],
    totalI: {
        type: Number,
    },
    dettes: [{
        _id: false,
        emprunts: {
            type: Number,
        },
        detteFournisseurs: {
            type: Number,
        },
        autresDette: {
            type: Number,
        },
    }],
    totalII: {
        type: Number,
    },
    totalPassif: {
        type: Number,
    }
}, { timestamps: true });

const Passif = mongoose.model('passif', passifSchema);

export { Passif };
