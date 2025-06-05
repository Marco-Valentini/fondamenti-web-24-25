const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// sfruttiamo lo schemaType per aggiungere validatori sui campi degli oggetti da inserire nel db
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "L'username è obbligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "L'email è obbligatoria"],
        unique: true,
        trim: true,
        lowercase: true,
        // Regex semplice per validazione email
        match: [/\S+@\S+\.\S+/, "L'email non è valida"],
    },
    password: {
        type: String,
        required: [true, "La password è obbligatoria"],
        minlength: [6, "La password deve essere di almeno 6 caratteri"],
    },
    bio: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String, // URL dell'immagine del profilo
        default: 'url_placeholder_immagine_profilo_default.jpg',
    },
    // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Opzionale per ora
    // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Opzionale per ora
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware pre-save per hashare la password prima di salvarla
userSchema.pre('save', async function (next) {
    // Esegui l'hashing solo se la password è stata modificata (o è nuova)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Metodo per confrontare la password inserita con quella hashata nel DB
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// qui la creazione del modello nel db è fatta contestualmente alla sua esportazione
module.exports = mongoose.model('User', userSchema);