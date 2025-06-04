// index.js è l'entry point per la nostra applicazione
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env nella root folder del progetto
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require("http")
const cors = require('cors'); // Per abilitare richieste Cross-Origin

// importiamo i router per gestire le richieste di autenticazione e di operazioni sui post


// creazione dell'app con il framework express

// express() ritorna un app che è una Function di JavaScript, che deve essere passata ad un server
// Node HTTP come callback per gestire le richieste

//controlliamo dal file delle variabili d'ambiente se è stata specificata una porta diversa dalla 3000
const PORT = process.env.PORT || 3000;

// Definiamo i middleware nell'ordine in cui vogliamo vengano eseguiti
app.use(cors({ // Configurazione CORS
    origin: 'http://localhost:5000', // O l'URL del tuo frontend se diverso, o true per tutti
    credentials: true // Necessario per inviare/ricevere cookie cross-origin
}));

app.use(express.json()); // Per parsare il body delle richieste JSON
app.use(express.urlencoded({extended: true})); // Per parsare il body delle richieste URL-encoded
app.use(cookieParser()); // Per parsare i cookie

// Routes API


// Route di base per test
app.get('/', (req, res) => {
    res.send('Benvenuto nel backend di Poligram!');
});

// Semplice gestore di errori globale
app.use((req, res, next) => {
    console.error("Errore nella richiesta:");
    res.status(500).send('Qualcosa è andato storto!');
});

// colleghiamo il database MongoDB


// Apriamo una connessione con il database e mettiamo il server in ascolto
