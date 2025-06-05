import React, { useState } from 'react';

// Componente per creare un nuovo post
// Riceve 'onPostCreated' come prop per notificare il genitore
function CreatePostForm({ onPostCreated }) {
    // Stato locale per i campi del form del post
    // Slide 21: Componenti e stato (useState)
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Recupera l'accessToken da localStorage per l'autenticazione
        const accessToken = localStorage.getItem('accessToken');

        try {
            // Chiamata API semplificata usando fetch
            const response = await fetch(`${API_BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Invia l'access token
                },
                body: JSON.stringify({ imageUrl, caption }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `Errore HTTP: ${response.status}`}));
                throw new Error(errorData.message || `Errore durante la creazione del post: ${response.statusText}`);
            }

            const newPostData = await response.json();
            onPostCreated(newPostData.post); // Notifica App.js
            setImageUrl(''); // Resetta i campi del form
            setCaption('');
        } catch (err) {
            console.error('Errore creazione post:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Crea Nuovo Post</h3>
            <div>
                <label htmlFor="imageUrl">URL Immagine:</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl} // Controlled component (slide 32)
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://esempio.com/immagine.jpg"
                    required
                />
            </div>
            <div>
                <label htmlFor="caption">Didascalia:</label>
                <textarea
                    id="caption"
                    value={caption} // Controlled component
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Scrivi una didascalia..."
                />
            </div>
            <button type="submit">Pubblica</button>
        </form>
    );
}

export default CreatePostForm;