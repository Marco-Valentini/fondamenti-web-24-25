// controllers/postController.js
const Post = require('../models/postModel');
const User = require('../models/userModel'); // Potrebbe servire per validare l'autore

// Crea un nuovo post
exports.createPost = async (req, res) => {
    try {
        // TODO prendi dal corpo della richiesta un imageUrl, la caption e lo userId (vedi verifyAccessToken)

        // TODO crea e salva nuovo post (con modello Post) - metodi accettati new + save o create

        // TODO Popola l'autore per restituire più informazioni (opzionale)

        // TODO rispondi con codice 201 e l'oggetto post popolato

    } catch (error) {
        console.error("Errore creazione post:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join('. ') });
        }
        res.status(500).json({ message: "Errore del server durante la creazione del post." });
    }
};


// Ottieni un post specifico per ID
exports.getPostById = async (req, res) => {
    try {
        // TODO prendi il post ID dalla richiesta, poi cerca tramite id

        // TODO rispondi al client con il post formato json

    } catch (error) {
        console.error("Errore recupero post per ID:", error);
        if (error.kind === 'ObjectId') { // Errore comune se l'ID non è un ObjectId valido
            return res.status(400).json({ message: "ID del post non valido." });
        }
        res.status(500).json({ message: "Errore del server." });
    }
};

// Elimina un post
exports.deletePost = async (req, res) => {
    try {
        // TODO prendiamo dalla richiesta ID del post e dell'utente

        // TODO recuperiamo il post

        // TODO Controlla se l'utente autenticato è l'autore del post

        // TODO cancella il post (findByIdAndDelete)

        // TODO rispondo con un json

    } catch (error) {
        console.error("Errore eliminazione post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID del post non valido." });
        }
        res.status(500).json({ message: "Errore del server." });
    }
};

// Aggiorna un post
exports.updatePost = async (req, res) => {
    try {
        // TODO homework
    } catch (e) {
        console.error("Errore aggiornamento post:", e);
    }
};

// Ottieni tutti i post (feed)
exports.getAllPosts = async (req, res) => {
    try {
        // Paginazione semplice (opzionale, ma buona pratica)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('author', 'username profilePicture') // Popola le info dell'autore
            .sort({ createdAt: -1 }) // Post più recenti prima
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        res.json({
            message: "Post recuperati con successo.",
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts
        });
    } catch (error) {
        console.error("Errore recupero post:", error);
        res.status(500).json({ message: "Errore del server durante il recupero dei post." });
    }
};


// Mettere "like" a un post - vedere come homework
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId; // Utente che mette il like

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post non trovato." });
        }

        // Controlla se l'utente ha già messo like
        const index = post.likes.findIndex(id => id.toString() === userId);

        if (index === -1) {
            // Like: aggiungi l'ID utente all'array dei likes
            post.likes.push(userId);
        } else {
            // Unlike: rimuovi l'ID utente dall'array dei likes
            post.likes = post.likes.filter(id => id.toString() !== userId);
        }

        await post.save();
        const populatedPost = await Post.findById(post._id)
            .populate('author', 'username profilePicture')
            .populate('likes', 'username'); // Popola anche gli utenti che hanno messo like

        res.json({ message: "Operazione like/unlike completata.", post: populatedPost });

    } catch (error) {
        console.error("Errore like/unlike post:", error);
        res.status(500).json({ message: "Errore del server." });
    }
};