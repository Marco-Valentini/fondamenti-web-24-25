const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // I refresh token di solito scadono, ma per semplicità non implementiamo l'auto-eliminazione qui
        // In produzione, potresti volerli far scadere (es. expires: '7d')
    },
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);