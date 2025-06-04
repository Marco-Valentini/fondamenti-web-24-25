const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// sfruttiamo lo schemaType per aggiungere validatori sui campi degli oggetti da inserire nel db
const userSchema = new mongoose.Schema({
    // TODO compilare lo schema
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