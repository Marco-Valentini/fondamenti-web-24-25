// controllers/postController.js
const Post = require('../models/postModel');
const User = require('../models/userModel'); // Potrebbe servire per validare l'autore

// Crea un nuovo post
exports.createPost = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;
        const authorId = req.userId; // Ottenuto dal middleware verifyAccessToken

        if (!imageUrl) {
            return res.status(400).json({ message: "L'URL dell'immagine è obbligatorio." });
        }

        const newPost = new Post({
            author: authorId,
            imageUrl,
            caption
        });

        await newPost.save();
        // Popola l'autore per restituire più informazioni (opzionale)
        const populatedPost = await Post.findById(newPost._id).populate('author', 'username profilePicture');


        res.status(201).json({ message: "Post creato con successo!", post: populatedPost });

    } catch (error) {
        console.error("Errore creazione post:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join('. ') });
        }
        res.status(500).json({ message: "Errore del server durante la creazione del post." });
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

// Ottieni un post specifico per ID
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId)
            .populate('author', 'username profilePicture email'); // Popola info autore

        if (!post) {
            return res.status(404).json({ message: "Post non trovato." });
        }
        res.json({ message: "Post recuperato con successo.", post });
    } catch (error) {
        console.error("Errore recupero post per ID:", error);
        if (error.kind === 'ObjectId') { // Errore comune se l'ID non è un ObjectId valido
            return res.status(400).json({ message: "ID del post non valido." });
        }
        res.status(500).json({ message: "Errore del server." });
    }
};


// Aggiorna un post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { caption } = req.body; // Per ora, permettiamo solo di aggiornare la caption
        const userId = req.userId; // ID dell'utente autenticato

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post non trovato." });
        }

        // Controlla se l'utente autenticato è l'autore del post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "Non autorizzato ad aggiornare questo post." });
        }

        if (caption !== undefined) {
            post.caption = caption;
        }
        // Aggiungi qui altri campi aggiornabili se necessario

        const updatedPost = await post.save();
        const populatedPost = await Post.findById(updatedPost._id).populate('author', 'username profilePicture');

        res.json({ message: "Post aggiornato con successo!", post: populatedPost });

    } catch (error) {
        console.error("Errore aggiornamento post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID del post non valido." });
        }
        res.status(500).json({ message: "Errore del server." });
    }
};

// Elimina un post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId; // ID dell'utente autenticato

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post non trovato." });
        }

        // Controlla se l'utente autenticato è l'autore del post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "Non autorizzato ad eliminare questo post." });
        }

        await Post.findByIdAndDelete(postId);

        res.json({ message: "Post eliminato con successo." });

    } catch (error) {
        console.error("Errore eliminazione post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID del post non valido." });
        }
        res.status(500).json({ message: "Errore del server." });
    }
};

// Mettere "like" a un post
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