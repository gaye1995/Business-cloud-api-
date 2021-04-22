import mongoose from 'mongoose';

const comptableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    societe: {
        type: String,
        required: true,
    },
    siret: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    zip: {
        type: String,
    },
    ville: {
        type: String,
    },
    avatar: {
        type: String,
    },
    birthdayDate: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    attempt: {
        type: Number,
    },
    lastLogin: {
        type: Number,
        default: Date.now(),
    },
    reset_password: {
        token: {
            type: String
        },
        date: {
            type: Number
        }
    },
    verify_email: {
        code: {
            type: String
        },
        date: {
            type: Number
        },
        verified: {
            type: Boolean
        }
    },
 
}, { timestamps: true });

const ComptableModel = mongoose.model('comptable', comptableSchema);

export { ComptableModel };