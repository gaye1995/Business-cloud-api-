import mongoose from 'mongoose';

const bilanSchema = new mongoose.Schema({
    bilanNum: {
        type: String,
        required: [true],
    },
    enterpriseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
    },
    articles: [{
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
            type: Number,
        }
    }],
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
    bilanDate: {
        type: Date,
    },
}, { timestamps: true });

const Bilan = mongoose.model('bilan', bilanSchema);

export { Bilan };
