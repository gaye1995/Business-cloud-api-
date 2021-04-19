import mongoose from 'mongoose';

const comptebqSchema = new mongoose.Schema({
    libelle: {
        type: String,
        required: [true],
    },
    libelleComptable: {
        type: String,
    },
    name: {
        type: String,
        required: [true],
    },
    iban: {
        type: String,
    },
    bic: {
        type: String,
        required: [true],
    }, 
    address: {
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
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    fax: {
        type: String,
    },
}, { timestamps: true });

const Comptebq = mongoose.model('comptebq', comptebqSchema);

export { Comptebq };
