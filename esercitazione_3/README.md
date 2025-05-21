# Terza Esercitazione Fondamenti del Web: Manipolazione del DOM con Web API e JavaScript

## Introduzione

Questa terza esercitazione per il corso di Fondamenti del Web riguarda lo sviluppo di funzionalità interattive per "Poligram", un'applicazione frontend che simula un social network di condivisione immagini. L'obiettivo è implementare, tramite HTML, CSS e JavaScript, la gestione dinamica dei post, includendo la loro creazione, aggiornamento e rimozione. Una struttura HTML/CSS di base dell'interfaccia è fornita come punto di partenza.

## Obiettivi Generali del Compito

Gli obiettivi di questo esercizio riguardano le seguenti macro-funzionalità:

### 1. Implementazione di un Form per la Creazione/Aggiornamento dei Post

-   **Scopo del Form:** Progettare e integrare nella pagina principale un form HTML che consenta agli utenti di creare nuovi post o, se un post per lo stesso autore esiste già, di aggiornarne i dettagli.
-   **Dati da Gestire:** Il form dovrà permettere l'inserimento almeno dei seguenti dati essenziali per un post:
    -   Nome dell'autore.
    -   Un'immagine.
    -   Una didascalia o descrizione.
    -   Una località (opzionale).
    -   Un'impostazione per abilitare/disabilitare la sezione commenti del post.
-   **Interazione:** Il form dovrà includere i controlli necessari per l'invio dei dati e per l'eventuale annullamento (reset) dell'operazione.

### 2. Sviluppo della Logica JavaScript per la Gestione dei Post

Implementare la logica client-side in un file JavaScript per:

-   **Rappresentazione dei Post:** Definire una funzione Costruttore per rappresentare un singolo post e le sue proprietà.
-   **Visualizzazione Dinamica:**
    -   Al momento della creazione o dell'aggiornamento tramite il form, il post corrispondente dovrà essere renderizzato dinamicamente o aggiornato nell'area principale di visualizzazione dei post.
    -   La struttura DOM di un post dovrà includere: le informazioni dell'autore, l'immagine, la didascalia, la località (se presente), e un'interfaccia per i commenti (la cui visibilità dipenderà dall'impostazione scelta).
    -   Ogni post visualizzato dovrà presentare un meccanismo (es. un pulsante) per permetterne l'eliminazione.
-   **Gestione dei Dati dei Post:**
    -   Mantenere un elenco (es. un array) dei post correntemente attivi nell'applicazione.
    -   Implementare la logica per cui un autore può avere al massimo un post attivo. Se un autore invia nuovamente il form, il suo post esistente dovrà essere aggiornato con le nuove informazioni (l'aggiornamento dell'immagine in questo scenario non è richiesto).
    -   La creazione di un nuovo post richiederà obbligatoriamente il caricamento di un'immagine e l'inserimento del nome dell'autore.
-   **Interazione con l'Utente:**
    -   Associare event listener al form di creazione/aggiornamento per processare i dati inseriti.
    -   Associare event listener ai pulsanti di eliminazione per rimuovere i post dalla visualizzazione e dalla struttura dati interna.
    -   Utilizzare [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) per la visualizzazione immediata delle immagini caricate tramite il form (non memorizzare l'immagine).

## Linee Guida Generali

-   Nella realizzazione dell'esercitazione l'uso di console.log e ispeziona elemento del browser potranno essere molto utili per il debug del codice
-   La scelta delle specifiche strutture HTML per il form e per la visualizzazione dei post è completamente libera, purché siano funzionali e semanticamente corrette.
-   La gestione dello stato (es. l'elenco dei post, gli autori) avverrà interamente lato client.
-   La validazione dei dati inseriti nel form è un aspetto importante da considerare.

## Crediti

- Marco Valentini
- Antonio Ferrara, PhD
