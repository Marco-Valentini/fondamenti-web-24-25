# Esercitazione 4: Realizzazione di un Backend RESTful con Node.js, Express, MongoDB e JWT per Poligram

Questa quarta esercitazione del corso di Fondamenti del Web vedrà l'impiego di Node.js, con i framework e le librerie Express, Mongoose e JSON Web Token, ai fini di realizzare il backend per l'applicazione Poligram (un'applicazione social simile a Instagram), il cui frontend è stato sviluppato nelle precedenti esercitazioni.
L'obiettivo è costruire un server robusto e sicuro che gestisca la logica di business, l'interazione con il database e l'autenticazione degli utenti.
## Prerequisiti

Prima di iniziare, assicuratevi di avere installato sul vostro sistema:

1.  **Node.js e npm:**
  *   Installare l'interprete Node.js (versione LTS consigliata, ad esempio 18.x o 20.x). Potete scaricarlo dal [sito ufficiale di Node.js](https://nodejs.org/).
  *   `npm` (Node Package Manager) viene installato automaticamente con Node.js. Potete verificarne l'installazione aprendo un terminale o prompt dei comandi e digitando:
      ```bash
      node -v
      npm -v
      ```
2.  **MongoDB:**
- È necessario avere accesso a un'istanza di MongoDB. Potete:
  -  Utilizzare un servizio cloud come MongoDB Atlas, che offre un piano gratuito ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)).
  -  Installare MongoDB Community Server localmente sul vostro computer ([Guida all'installazione di MongoDB](https://www.mongodb.com/try/download/community)). 
  
  Indipendentemente dalla scelta, avrete bisogno della **stringa di connessione** al vostro database MongoDB.
3.  **Postman (o un client API simile):**
  *   Per testare gli endpoint API che andremo a creare, è altamente consigliato l'uso di uno strumento come Postman. Potete scaricarlo da [qui](https://www.postman.com/downloads/) o in alternativa utilizzare la versione [web](https://www.postman.com/).

## Preparazione dell'Ambiente di Sviluppo

1.  **Creazione della Cartella di Progetto:**
    Create una nuova cartella sul vostro computer per questo progetto (es. `poligram-backend`).
2.  **Inizializzazione del Progetto Node.js:**
    Aprite un terminale, navigate nella cartella del progetto appena creata e eseguite il seguente comando per inizializzare un nuovo progetto Node.js e creare il file `package.json`:
    ```bash
    npm init -y
    ```
3.  **Installazione delle Dipendenze Iniziali:**
    Installeremo le librerie fondamentali necessarie per iniziare. Eseguite il seguente comando nel terminale:
    ```bash
    npm install express mongoose jsonwebtoken bcryptjs dotenv cookie-parser cors
    ```
    E per lo sviluppo (riavvio automatico del server):
    ```bash
    npm install --save-dev nodemon
    ```

## Requisiti Funzionali Core:
  - Utenti:
    - Registrazione di nuovi utenti (username, email, password). 
    - Login per utenti esistenti. 
    - Logout.
  - Post:
    - Creazione di nuovi post (immagine, didascalia) da parte di utenti autenticati. 
    - Visualizzazione di un feed di post (tutti i post, ordinati per data). 
    - Visualizzazione di un singolo post. 
    - Modifica di un post (solo dall'autore). 
    - Eliminazione di un post (solo dall'autore). 
    - Possibilità di mettere "like" a un post (e toglierlo).
  - Autenticazione ed Autorizzazione
    - Proteggere le operazioni sensibili (creare post, modificare, eliminare) solo per utenti autenticati. 
    - Assicurare che solo l'autore di un post possa modificarlo o eliminarlo.
## Requisiti Non Funzionali (Architetturali)
  - API RESTful: Esporre endpoint chiari e seguendo le convenzioni REST. 
  - Stateless Authentication: Utilizzare JSON Web Tokens (JWT) per non dover mantenere lo stato della sessione sul server (slides cap.9 su "Autenticazione stateless"). 
  - Database NoSQL: Utilizzare MongoDB per la flessibilità nella gestione dei dati (slides cap.9 su "Il database MongoDB"). 
  - Scalabilità: L'approccio stateless e l'uso di MongoDB favoriscono la scalabilità orizzontale.



