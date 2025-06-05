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
        const { username, email, password, bio, profilePicture } = req.body;

        // Controlla se l'utente o l'email esistono già
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username già in uso." });
        }
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email già in uso." });
        }

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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email e password sono obbligatori." });
        }
        // la ricerca dell'utente viene fatta per email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Credenziali non valide." }); // Messaggio generico
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenziali non valide." }); // Messaggio generico
        }
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
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Non autorizzato: Refresh token mancante." });
    }

    const refreshTokenFromCookie = cookies.jwt;

    // debug
    console.log(`[REFRESH] Tentativo di refresh con token dal cookie: ${refreshTokenFromCookie}`);
    const foundToken = await RefreshToken.findOne({ token: refreshTokenFromCookie });
    if (!foundToken) {
        console.log(`[REFRESH] Token ${refreshTokenFromCookie} NON trovato nel DB. Accesso negato.`);
        return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto (non in DB)." });
    }
    console.log(`[REFRESH] Token ${refreshTokenFromCookie} TROVATO nel DB. Procedo con la verifica JWT.`);

    try {
        // Cerca il refresh token nel DB
        const foundToken = await RefreshToken.findOne({ token: refreshTokenFromCookie });
        if (!foundToken) {
            // Se il token non è nel DB ma era nel cookie, potrebbe essere stato compromesso o è vecchio.
            // Per maggiore sicurezza, potremmo invalidare tutti i refresh token di questo utente
            // e richiedere un nuovo login. Per ora, restituiamo solo un errore.
            return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto." });
        }

        // Verifica il refresh token
        jwt.verify(refreshTokenFromCookie, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err || foundToken.userId.toString() !== decoded.userId) {
                // Se la verifica fallisce o l'ID utente nel token non corrisponde a quello nel DB
                return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto." });
            }

            // Il refresh token è valido, genera un nuovo access token
            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error("Errore refresh token:", error);
        res.status(500).json({ message: "Errore del server durante il refresh del token." });
    }
};

// Logout Utente
exports.logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content, nessun cookie da eliminare
    }
    const refreshTokenFromCookie = cookies.jwt;

    // log per debug
    console.log(`[LOGOUT] Tentativo di eliminare refresh token dal DB: ${refreshTokenFromCookie}`);
    const result = await RefreshToken.deleteOne({ token: refreshTokenFromCookie });
    console.log(`[LOGOUT] Risultato deleteOne: deletedCount = ${result.deletedCount}`);

    if (result.deletedCount === 0) {
        console.warn(`[LOGOUT] ATTENZIONE: Nessun refresh token trovato nel DB da eliminare per il token: ${refreshTokenFromCookie}`);
    }

    try {
        // Rimuovi il refresh token dal database
        await RefreshToken.deleteOne({ token: refreshTokenFromCookie });

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

// qui non serve esportare nulla perché gli exports sono fatti contestualmente alla definizione delle funzioni