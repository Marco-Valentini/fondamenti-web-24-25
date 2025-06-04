// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Necessario per caricare l'utente se serve

// Middleware per verificare l'Access Token JWT
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Non autorizzato: Token mancante o malformato' });
    }

    const token = authHeader.split(' ')[1]; // Prende il token dopo "Bearer "

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Se il token è scaduto, err.name sarà 'TokenExpiredError'
            // Altri errori possono essere 'JsonWebTokenError' per token non validi
            console.error('Errore verifica JWT:', err.name, err.message);
            return res.status(403).json({ message: 'Proibito: Token non valido o scaduto' });
        }
        // Il token è valido, aggiungi l'ID dell'utente e il ruolo (se presente nel token) alla richiesta
        req.userId = decoded.userId; // Assicurati che il payload del token contenga userId
        // req.userRole = decoded.role; // Se hai un ruolo nel token
        next();
    });
};

// Esempio di middleware per verificare un ruolo specifico (se necessario)
// const verifyRole = (allowedRoles) => {
//     return (req, res, next) => {
//         if (!req.userRole || !allowedRoles.includes(req.userRole)) {
//             return res.status(403).json({ message: 'Proibito: Ruolo non sufficiente' });
//         }
//         next();
//     };
// };

module.exports = { verifyAccessToken /*, verifyRole */ };