import mongoose from 'mongoose';

const bilanSchema = new mongoose.Schema({

    articles: [{
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
            type: Number,
        }
    }],

    bilanDate: {
        type: Date,
    },
}, { timestamps: true });

const Bilan = mongoose.model('bilan', bilanSchema);

export { Bilan };
