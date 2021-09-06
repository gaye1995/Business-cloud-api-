import mongoose from 'mongoose';

const bilanSchema = new mongoose.Schema({
    actif :{
        _id: false,
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
    },
    passif: {
        _id: false,
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
    },
    dateBilan: Date
}, { timestamps: true });

const Bilan = mongoose.model('bilan', bilanSchema);

export { Bilan };
