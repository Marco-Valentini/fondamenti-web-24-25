// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyAccessToken } = require('../middlewares/authMiddleware'); // Middleware di autenticazione

// GET /api/posts - Ottieni tutti i post (feed) - Pubblico

// POST /api/posts - Crea un nuovo post - Protetto

// GET /api/posts/:postId - Ottieni un post specifico - Pubblico

// PUT /api/posts/:postId - Aggiorna un post - Protetto, solo autore

// DELETE /api/posts/:postId - Elimina un post - Protetto, solo autore

// POST /api/posts/:postId/like - Metti/togli like a un post - Protetto

module.exports = router;