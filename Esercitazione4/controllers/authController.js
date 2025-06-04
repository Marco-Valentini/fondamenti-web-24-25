// import delle librerie necessarie e dello schema utente
const User = require('../models/userModel');
const RefreshToken = require('../models/refreshTokenModel');
const jwt =require('jsonwebtoken');

// Funzione helper per generare i token
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId: userId }, // Payload
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' } // Access token a breve scadenza
    );
    const refreshToken = jwt.sign(
        { userId: userId }, // Payload
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }  // Refresh token a lunga scadenza
    );
    return { accessToken, refreshToken };
};

// Registrazione Utente
exports.registerUser = async (req, res) => {
    try {
        // TODO prendi i dati dell'utente dal corpo della richiesta

        // TODO Controlla se l'utente o l'email esistono già -> metodo findOne di mongoose


        const newUser = new User({ username, email, password, bio, profilePicture });
        await newUser.save(); // La password viene hashata dal middleware pre-save in userModel

        res.status(201).json({ message: "Utente registrato con successo!", userId: newUser._id });

    } catch (error) {
        console.error("Errore registrazione:", error);
        // Gestione degli errori di validazione di Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join('. ') });
        }
        res.status(500).json({ message: "Errore del server durante la registrazione." });
    }
};

// Login Utente
exports.loginUser = async (req, res) => {
    try {
        // TODO prendi email e password dal corpo della richiesta
        const { email, password } = req.body;
        // TODO verifica la presenza di mail e password, altrimenti rispondi con cod errore 400

        // TODO la ricerca dell'utente viene fatta per email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Credenziali non valide." }); // Messaggio generico
        }
        // TODO possiamo sfruttare il metodo comparePassword dell'utente per verificare che le password coincidano

        // Se le credenziali sono valide, allora creiamo i token
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Salva il refresh token nel database + Log per debug
        console.log(`[LOGIN] Salvataggio refresh token nel DB: ${refreshToken} per utente ${user._id}`);
        await RefreshToken.create({ token: refreshToken, userId: user._id });

        // Imposta il refresh token in un cookie HTTPOnly
        res.cookie('jwt', refreshToken, {
            httpOnly: true,         // Accessibile solo dal server web
            secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione
            sameSite: 'Strict',     // Aiuta a prevenire CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni (come la scadenza del token)
        });

        // Invia l'access token nel corpo della risposta
        res.json({
            message: "Login effettuato con successo!",
            accessToken,
            user: { // Invia alcune info utente non sensibili
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Errore login:", error);
        res.status(500).json({ message: "Errore del server durante il login." });
    }
};

// Refresh Access Token
exports.refreshToken = async (req, res) => {
    // TODO prendiamo il cookie dalla richiesta, accedendo al campo 'jwt'


    //TODO cerca il token nel db, se non si trova rispondi con 403

    try {
        // TODO Cerca il refresh token nel DB

        // TODO se il token non è trovato allora rispondi con 403

        // TODO Verifica il refresh token con jwt.verify https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        // TODO Il refresh token è valido, genera un nuovo access token, con jwt.sign https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback

    } catch (error) {
        console.error("Errore refresh token:", error);
        res.status(500).json({ message: "Errore del server durante il refresh del token." });
    }
};

// Logout Utente
exports.logoutUser = async (req, res) => {
    // TODO recupera il cookie dalla richiesta e il jwt dal cookie



    try {
        //TODO Rimuovi il refresh token dal database -> metti il risultato di deleteOne in un result

        if (result.deletedCount === 0) {
            console.warn(`[LOGOUT] ATTENZIONE: Nessun refresh token trovato nel DB da eliminare per il token: ${refreshTokenFromCookie}`);
        }

        // Pulisci il cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        res.status(200).json({ message: "Logout effettuato con successo." });

    } catch (error) {
        console.error("Errore logout:", error);
        res.status(500).json({ message: "Errore del server durante il logout." });
    }
};