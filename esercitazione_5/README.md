# Esercitazione React: Frontend Poligram Semplificato

Questa esercitazione si concentra sulla creazione di un frontend didattico per Poligram utilizzando i concetti base di React, interagendo con un backend RESTful. L'obiettivo è illustrare l'applicazione pratica dei **componenti**, **props**, **stato**, **form controllati** e **rendering condizionale**.

## Obiettivi 

*   Comprendere la struttura di un'applicazione React con **componenti funzionali**.
*   Utilizzare le **props** per passare dati da componenti genitore a figli.
*   Gestire lo **stato locale** di un componente con l'hook `useState`.
*   Implementare **form controllati** per l'input utente.
*   Applicare il **rendering condizionale** per mostrare UI diverse.
*   Effettuare semplici **chiamate API** (fetch) a un backend.
*   Utilizzare l'hook `useEffect` per effetti collaterali (es. caricamento dati al mount).
*   Renderizzare **liste di componenti** con chiavi (`key`) appropriate.

## Prerequisiti

*   Node.js e npm installati.
*   Il backend Poligram (sviluppato precedentemente) deve essere in esecuzione e accessibile su `http://localhost:3000`.

## Preparazione dell'Ambiente

1.  **Crea una Nuova Applicazione React (se non già fatto):**
    ```bash
    npx create-react-app poligram-frontend-semplificato
    cd poligram-frontend-semplificato
    ```
2.  **Struttura dei File:** Organizza i componenti in una cartella `src/components`.
3.  **File `.env`:** Crea un file `.env` nella root del progetto frontend con:
    ```env
    PORT=5001
    REACT_APP_API_BASE_URL=http://localhost:3000/api
    ```
4.  **Installa Dipendenze:** Il comando `create-react-app` installa già `react` e `react-dom`. Non sono necessarie altre dipendenze per questa versione semplificata.

## Avvio

1.  **Avvia il Backend:** Assicurati che il server backend sia in esecuzione.
2.  **Avvia il Frontend:** Nella cartella del progetto frontend, esegui:
    ```bash
    npm start
    ```
    L'applicazione dovrebbe aprirsi su `http://localhost:5001` (NB: se si apre su una porta diversa è importante cambiare le impostazioni di cors nel backend).

## Flusso dell'Applicazione Semplificata

1.  **Autenticazione:**
    *   L'utente vede un form per il login o la registrazione.
    *   Al submit, viene fatta una chiamata API.
    *   In caso di login successo, un `accessToken` e i dati utente vengono salvati in `localStorage` e lo stato `currentUser` in `App.jsx` viene aggiornato.
2.  **Feed:**
    *   Se l'utente è loggato (`currentUser` non è null), viene mostrato il feed.
    *   `useEffect` in `App.jsx` carica i post all'avvio e dopo il login.
    *   Viene mostrato un form per creare nuovi post.
    *   I post esistenti vengono renderizzati dal componente `Post.jsx`.
3.  **Interazioni:**
    *   Creazione di un post (solo utenti loggati).
    *   Like/Unlike di un post (solo utenti loggati).
    *   Eliminazione dei propri post (solo utenti loggati).
    *   Logout.

**NB**:Questa versione è volutamente semplificata per scopi didattici, omettendo la gestione avanzata degli errori API, il refresh automatico del token, e ottimizzazioni complesse.

## Immagini di test
Di seguito i link di alcune immagini stock che potreste usare durante la fase di prototipazione:
- [immagine 1](https://cdn.pixabay.com/photo/2025/05/11/22/31/man-9594075_1280.jpg)

- [immagine 2](https://cdn.pixabay.com/photo/2025/04/22/09/32/daisy-9549631_1280.jpg)

- [immagine 3](https://cdn.pixabay.com/photo/2025/05/26/10/27/rock-9622937_1280.jpg)

- [immagine 4](https://cdn.pixabay.com/photo/2025/05/31/20/23/trees-9634157_1280.jpg)

- [immagine 5](https://cdn.pixabay.com/photo/2024/06/21/11/41/ai-generated-8844218_1280.jpg)