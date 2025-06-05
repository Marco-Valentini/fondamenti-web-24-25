# Esercitazione 4: Realizzazione di un Backend RESTful con Node.js, Express, MongoDB e JWT per Poligram

- Requisiti Funzionali Core:
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
- Requisiti Non Funzionali (Architetturali)
  - API RESTful: Esporre endpoint chiari e seguendo le convenzioni REST. 
  - Stateless Authentication: Utilizzare JSON Web Tokens (JWT) per non dover mantenere lo stato della sessione sul server (slides cap.9 su "Autenticazione stateless"). 
  - Database NoSQL: Utilizzare MongoDB per la flessibilità nella gestione dei dati (slides cap.9 su "Il database MongoDB"). 
  - Scalabilità: L'approccio stateless e l'uso di MongoDB favoriscono la scalabilità orizzontale.

**NB** per usare nodemon è necessario avviare l'applicazione con nodemon index.jsx