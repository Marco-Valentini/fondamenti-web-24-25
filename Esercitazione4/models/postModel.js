const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // TODO compilare con lo schema del post
    // TODO aggiungi commento lasciato come homework
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