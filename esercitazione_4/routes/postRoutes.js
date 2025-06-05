// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyAccessToken } = require('../middlewares/authMiddleware'); // Middleware di autenticazione

// GET /api/posts - Ottieni tutti i post (feed) - Pubblico
router.get('/', postController.getAllPosts);

// POST /api/posts - Crea un nuovo post - Protetto
router.post('/', verifyAccessToken, postController.createPost);

// GET /api/posts/:postId - Ottieni un post specifico - Pubblico
router.get('/:postId', postController.getPostById);

// PUT /api/posts/:postId - Aggiorna un post - Protetto, solo autore
router.put('/:postId', verifyAccessToken, postController.updatePost);

// DELETE /api/posts/:postId - Elimina un post - Protetto, solo autore
router.delete('/:postId', verifyAccessToken, postController.deletePost);

// POST /api/posts/:postId/like - Metti/togli like a un post - Protetto
router.post('/:postId/like', verifyAccessToken, postController.likePost);

module.exports = router;