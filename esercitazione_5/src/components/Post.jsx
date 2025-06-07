/* Componente funzionale per visualizzare un singolo post
Riceve 'post' e 'currentUser' come props*/
import React, { useState } from 'react';

function Post({ post, currentUser, onDeletePost, onLikePost }) {
    // Verifica se l'utente corrente è l'autore del post
    const isAuthor = currentUser && post.author?._id === currentUser?.id;

    // Verifica se l'utente corrente ha messo "like" al post
    const [hasLiked, setHasLiked] = useState(currentUser && post.likes?.some(likeId => likeId === currentUser?.id));

    return (
        // JSX per rappresentare un post
        <article className="post">
            <header className="post-header">
                {post.author?.username || 'Utente Sconosciuto'}
            </header>

            <div className="post-image-container">
                {post.imageUrl ? (
                    <img
                        src={post.imageUrl}
                        alt={post.caption || `Post di ${post.author?.username || ''}`}
                    />
                ) : (
                    // Rendering condizionale per il placeholder
                    <div className="image-error-placeholder">
                        {post.imageUrl ? 'Immagine non caricata' : 'Nessuna immagine'}
                    </div>
                )}
            </div>

            <div className="post-actions">
                {currentUser && ( // Mostra il bottone like solo se l'utente è loggato
                    <button onClick={() => {onLikePost(post._id); setHasLiked(!hasLiked || post.likes === 0) }}>
                        {hasLiked ? 'Non mi piace più' : 'Mi Piace'} ({post.likes?.length || 0})
                    </button>
                )}
            </div>

            {post.caption && (
                <div className="post-caption-container">
                    <span className="author-username">{post.author?.username || ''}</span>
                    <p className="post-caption">{post.caption}</p>
                </div>
            )}

            {isAuthor && ( // Bottone elimina visibile solo all'autore
                <div style={{ padding: '0 16px 12px', textAlign: 'right' }}>
                    <button
                        onClick={() => onDeletePost(post._id)}
                        style={{ backgroundColor: "transparent", color: "#ed4956", fontSize: "0.9em" }}
                    >
                        Elimina Post
                    </button>
                </div>
            )}
        </article>
    );
}

export default Post;