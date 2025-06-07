// import delle librerie necessarie
import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import Post from './components/Post';
import CreatePostForm from './components/CreatePostForm';
import Navbar from "./components/Navbar";

// URL base dell'API, preso dalle variabili d'ambiente
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// App è il componente principale dell'applicazione
function App() {
    // Hook useState per gestire lo stato dell'utente loggato
    const [currentUser, setCurrentUser] = useState(null);
    // Stato per la lista dei post
    const [posts, setPosts] = useState([]);
    // Stato per alternare tra form di login e registrazione
    const [isLoginView, setIsLoginView] = useState(true);

    // useEffect per caricare i post e controllare lo stato di login al mount
    useEffect(() => {
        const loadInitialData = async () => {
            // Funzione helper interna a useEffect per le chiamate fetch
            // perché sono gestiti da loadInitialData
            const fetchDataForEffect = async (endpoint, options = {}) => {
                const localAccessToken = localStorage.getItem('accessToken');
                const headers = {
                    'Content-Type': 'application/json',
                    ...options.headers,
                };
                if (localAccessToken) {
                    headers['Authorization'] = `Bearer ${localAccessToken}`;
                }

                // NOTA: Per questo esempio, assumiamo che il token sia valido

                const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
                const responseData = response.status === 204 ? null : await response.json();

                if (!response.ok) {
                    const errorMessage = responseData?.message || `Errore caricamento ${endpoint}: ${response.status}`;
                    console.error(`Errore API per ${endpoint}:`, errorMessage);
                    throw new Error(errorMessage);
                }
                return responseData;
            };

            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken'); // Lo leggiamo comunque per decidere il flusso

            try {
                if (storedUser && token) {
                    setCurrentUser(JSON.parse(storedUser));
                    // Carica i post se l'utente è "loggato" (token presente)
                    const postsData = await fetchDataForEffect('/posts');
                    if (postsData) setPosts(postsData.posts || []);
                } else {
                    // Carica i post pubblici se non c'è utente/token
                    const postsData = await fetchDataForEffect('/posts');
                    if (postsData) setPosts(postsData.posts || []);
                }
            } catch (e) {
                console.error("Errore durante il caricamento dei dati iniziali:", e);
                // Se l'errore è legato a un token non valido e l'utente era "loggato",
                // potremmo voler fare logout.
                if (storedUser && token && e.message.toLowerCase().includes("token")) {
                    handleLogout(false); // Fai logout senza chiamare l'API di logout
                }
            }
        };
        loadInitialData();
    }, []); // Array di dipendenze vuoto: esegui solo al mount


    const handleAuthSubmit = async (credentials) => {
        const endpoint = isLoginView ? '/auth/login' : '/auth/register';

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json(); // Assumiamo che il server risponda sempre JSON anche per errori non-ok

            if (!response.ok) {
                throw new Error(data?.message || `Errore autenticazione: ${response.status}`);
            }

            if (isLoginView && data?.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                setCurrentUser(data.user);
                // Ricarica i post dopo il login (usando un fetch diretto)
                try {
                    const postsResponse = await fetch(`${API_BASE_URL}/posts`);
                    const postsData = await postsResponse.json();
                    if(postsResponse.ok) setPosts(postsData.posts || []);
                    else console.error("Errore ricaricamento post dopo login");
                } catch (e) { console.error("Errore fetch post dopo login:", e); }

            } else if (!isLoginView) {
                setIsLoginView(true);
            }
        } catch (error) {
            console.error(`Errore API per ${endpoint}:`, error);
        }
    };

    const handleLogout = async (callApi = true) => {
        if (callApi) {
            try {
                // Non serve l'accessToken per il logout se gestito via cookie refresh token
                await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
            } catch (e) {
                console.error("Logout API fallito, procedo con logout client:", e);
            }
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setCurrentUser(null);
        setIsLoginView(true);
    };


    const handlePostCreated = (newPost) => {
        // Aggiunge il nuovo post in cima alla lista (aggiornamento ottimistico prima del re-fetch)
        // Slide 28: Stato con Array (creare un nuovo array)
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo post?")) return;
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || `Errore eliminazione: ${response.status}`);
            }
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Errore eliminazione post:", error);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const updatedPostData = await response.json();
            if (!response.ok) {
                throw new Error(updatedPostData?.message || `Errore like: ${response.status}`);
            }
            if (updatedPostData?.post) {
                setPosts(prevPosts =>
                    prevPosts.map(p => (p._id === updatedPostData.post._id ? updatedPostData.post : p))
                );
            }
        } catch (error) {
            console.error("Errore like post:", error);
        }
    };


    // Rendering condizionale basato sullo stato 'currentUser'
    if (!currentUser) {
        return (
            <div className="container">
                <h1>Poligram Semplificato</h1>
                <AuthForm
                    onSubmitForm={handleAuthSubmit}
                    formType={isLoginView ? 'login' : 'register'}
                />
                <button className="toggle-form-button" onClick={() => { setIsLoginView(!isLoginView)}}>
                    {isLoginView ? 'Non hai un account? Registrati' : 'Hai già un account? Login'}
                </button>
            </div>
        );
    }

    // Vista per l'utente loggato
    return (
        <div className="container">
            {/* Composizione di componenti (slide 13) */}
            <Navbar user={currentUser} onLogout={handleLogout} />

            <CreatePostForm onPostCreated={handlePostCreated} />

            <h2>Feed</h2>
            {/* Mappare un array a componenti React (slide 17: Liste e Chiavi) */}
            {posts.map(post => (
                <Post
                    key={post._id} // Chiave univoca per ogni elemento della lista
                    post={post}
                    currentUser={currentUser}
                    onDeletePost={handleDeletePost}
                    onLikePost={handleLikePost}
                />
            ))}
        </div>
    );
}

export default App;