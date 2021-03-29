import mongoose from 'mongoose';

const comptebqSchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: [true],
    },
    libelleComptable: {
        type: String,
        required: [true],
    },
    name: {
        type: String,
    },
    iban: {
        type: String,
    },
    bic: {
        type: Date,
    }, address: {
        type: String,
        required: [true],
    },
    zip: {
        type: String,
        required: [true],
    },
    city: {
        type: String,
        required: [true],
    },
    country: {
        type: String,
        required: [true],
    },
    firstname: {
        type: String,
        required: [true],
    },
    lastname: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
    },
    phone: {
        type: String,
    },
    fax: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Comptebq = mongoose.model('comptebq', comptebqSchema);

export { Comptebq };
