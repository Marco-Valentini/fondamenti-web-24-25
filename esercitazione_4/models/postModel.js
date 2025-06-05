const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Riferimento al modello User
        required: true,
    },
    imageUrl: {
        type: String, // URL dell'immagine del post
        required: [true, "L'URL dell'immagine è obbligatorio"],
    },
    caption: {
        type: String,
        trim: true,
        default: '',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Utenti a cui piace il post
    }],
    // comments: [{ // Opzionale per ora
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //     text: String,
    //     createdAt: { type: Date, default: Date.now }
    // }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', postSchema);