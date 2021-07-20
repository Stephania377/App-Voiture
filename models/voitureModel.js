const mongoose = require('mongoose')

const VoitureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        types: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        picture: {
            type: String,
        },
        comments: {
            type: [
                {
                    commentUserId: String,
                    text: String,
                    timestamps: Number
                }
            ],
        },
        likes: {
            type: [String]
        },
    },
    {
        timestamps: true
    }
)
const voitureModel = mongoose.model('voiture', VoitureSchema);

module.exports = voitureModel