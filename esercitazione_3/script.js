// Array per memorizzare gli oggetti Post (simula un database)
let posts = [];
// Array per memorizzare i nomi degli autori (per un rapido controllo di esistenza)
let author_list = [];

// Funzione per creare un nuovo oggetto Post
function Post(containerElement, author, location, image, caption, comments) {
    // Proprietà dell'oggetto Post
    this.author = author;                                       // Autore del post
    this.location = location;                                   // Luogo del post
    this.image = image;                                         // URL dell'immagine del post
    this.caption = caption;                                     // Didascalia del post
    this.comments = comments;                                   // Booleano: i commenti sono abilitati?

    // --- Creazione degli elementi DOM per il post ---

    // Elemento principale del post (div con classe "post")
    this.div_post = document.createElement("div");
    this.div_post.classList.add("post");                        // Aggiunge la classe CSS "post"

    // Header del post: contiene info utente e bottone elimina
    this.div_header = document.createElement("div");
    this.div_header.classList.add("post-header");

    // Contenitore per le informazioni dell'utente (username, location)
    this.div_user_info = document.createElement("div");
    this.div_user_info.classList.add("post-user-info");

    // Paragrafo per il nome utente
    this.username_paragraph = document.createElement("p");
    this.username_paragraph.classList.add("post-username");
    this.username_paragraph.append(document.createTextNode(author)); // Imposta il testo con il nome dell'autore

    // Paragrafo per la location
    this.post_location = document.createElement("p");
    this.post_location.classList.add("post-location");
    this.post_location.append(document.createTextNode(location)); // Imposta il testo con la location

    // Aggiunge username e location al div_user_info
    this.div_user_info.append(this.username_paragraph);
    this.div_user_info.append(this.post_location);

    // Bottone per eliminare il post
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("post-delete-button");
    deleteButton.ariaLabel = "Delete post";                     // Attributo per l'accessibilità
    deleteButton.append(document.createTextNode("X"));          // Testo del bottone

    // Aggiunge user_info e deleteButton all'header
    this.div_header.append(this.div_user_info);
    this.div_header.append(deleteButton);
    // Aggiunge l'header completo al div principale del post
    this.div_post.append(this.div_header);

    // Immagine del post
    this.img = document.createElement("img");
    this.img.src = image;                                       // Imposta la sorgente dell'immagine
    this.img.classList.add("post-image");
    this.img.alt = "Post Image";                                // Testo alternativo per l'immagine
    this.div_post.append(this.img);                             // Aggiunge l'immagine al post

    // Didascalia (caption) del post
    this.caption_paragraph = document.createElement("p");
    this.caption_paragraph.classList.add("caption");
    this.caption_paragraph.append(document.createTextNode(caption)); // Imposta il testo della didascalia
    this.div_post.append(this.caption_paragraph);

    // Form per inserire i commenti
    this.insert_comments = document.createElement("form");
    this.insert_comments.classList.add('comment-form');         // Aggiunge classe per coerenza stilistica
    // Impedisce il submit tradizionale del form dei commenti (che causerebbe un refresh)
    this.insert_comments.addEventListener('submit', (e) => e.preventDefault());

    // Campo di input per il testo del commento
    let comment_input = document.createElement("input");
    comment_input.type = "text";
    comment_input.placeholder = "Aggiungi un commento...";
    comment_input.classList.add("comment-input");

    // Bottone per inviare il commento
    let comment_button = document.createElement("button");
    comment_button.classList.add("comment-button");
    comment_button.type = "submit";
    comment_button.appendChild(document.createTextNode("Post"));

    // Aggiunge input e bottone al form dei commenti
    this.insert_comments.append(comment_input);
    this.insert_comments.append(comment_button);
    // Aggiunge il form dei commenti al post
    this.div_post.append(this.insert_comments);

    // Controlla se i commenti devono essere visibili o nascosti
    if (this.comments === false) {
        this.insert_comments.style.display = 'none';            // Nasconde il form se i commenti non sono permessi
    }

    // METODO: Aggiorna le informazioni di un post esistente
    this.updatePost = function(location, caption, comments) {
        // Aggiorna la location se fornita
        if (location) {
            this.post_location.textContent = location;          // Aggiorna il testo nel DOM
            this.location = location;                           // Aggiorna la proprietà dell'oggetto
        }
        // Aggiorna la caption se fornita
        if (caption) {
            this.caption_paragraph.textContent = caption;       // Aggiorna il testo nel DOM
            this.caption = caption;                             // Aggiorna la proprietà dell'oggetto
        }
        // Aggiorna la visibilità del form dei commenti
        if (comments) {
            this.insert_comments.style.display = '';            // Mostra il form (rimuovendo 'display: none')
            this.comments = comments;                           // Aggiorna la proprietà
        } else {
            this.insert_comments.style.display = 'none';        // Nasconde il form
            this.comments = comments;                           // Aggiorna la proprietà
        }
    }.bind(this); // .bind(this) assicura che 'this' si riferisca all'oggetto Post

    // Event listener per il bottone di eliminazione
    deleteButton.addEventListener("click", function(e) {
        // Rimuove l'elemento DOM del post (e.target è il bottone)
        e.target.closest('.post').remove();                     // Trova e rimuove il div.post più vicino

        // Rimuove il post dall'array 'posts'
        const postIndex = posts.findIndex(p => p === this);     // Trova l'indice di questo post
        if (postIndex > -1) posts.splice(postIndex, 1);         // Rimuove 1 elemento dall'indice trovato

        // Rimuove l'autore da 'author_list' se non ha altri post (logica semplificata)
        const authorIndex = author_list.indexOf(this.author);
        author_list.splice(authorIndex, 1);
        // Per una logica più robusta, bisognerebbe contare i post per autore
        // if (authorIndex > -1 && !posts.some(p => p.author === this.author)) {
        //     author_list.splice(authorIndex, 1);
        // }
    }.bind(this)); // .bind(this) per usare 'this' dell'oggetto Post

    // Inserisce il nuovo elemento post nel DOM, all'inizio del container
    containerElement.insertBefore(this.div_post, containerElement.firstChild);
}

// Seleziona il div che contiene la lista verticale dei post
let post_list_container = document.querySelector(".vertical-scroll");

// Seleziona il form per la creazione di nuovi post
let new_post_form = document.getElementById("new_post").querySelector("form");

// Event listener per il submit del form "new_post"
new_post_form.addEventListener("submit", function(e) {
    e.preventDefault();                                         // Impedisce il comportamento di default del submit

    // Estrae i valori dai campi del form
    let author = e.target.author.value.trim();                  // .trim() rimuove spazi bianchi iniziali/finali
    let location = e.target.location.value;
    let imageFile = e.target.image.files[0];                    // Prende il primo file selezionato
    let caption = e.target.caption.value;
    let allowComments = e.target.post_comments.value === "true"; // Converte la stringa "true"/"false" in booleano

    if (!author) {
        window.alert("Il nome dell'autore è obbligatorio!");
        return;                                                 // Interrompe l'esecuzione se l'autore manca
    }

    // Cerca se esiste già un post per questo autore
    const existingPost = posts.find(p => p.author === author);

    if (existingPost) {
        // Se l'autore esiste, aggiorna il suo post esistente
        // NOTA: Questa logica assume che un autore possa avere un solo post.
        // Se un autore potesse avere più post, servirebbe un identificatore univoco per post.
        // Inoltre, l'immagine non viene aggiornata in questo scenario di update (può essere aggiunto se necessario)
        console.log(`Aggiornamento post per l'autore: ${author}`);
        existingPost.updatePost(location, caption, allowComments);
    } else {
        // Se l'autore non esiste e un'immagine è stata fornita, crea un nuovo post
        if (imageFile) {
            const reader = new FileReader();                        // Oggetto per leggere il contenuto del file

            // Event listener: eseguito quando il file è stato letto
            reader.addEventListener('load', function(event_reader) {
                const imageUrl = event_reader.target.result;        // URL dati dell'immagine (base64)

                // Crea una nuova istanza dell'oggetto Post
                const newPostObject = new Post(post_list_container, author, location, imageUrl, caption, allowComments);
                // Aggiunge il nuovo oggetto post all'array 'posts'
                posts.push(newPostObject);
                // Aggiunge il nome dell'autore all'array 'author_list'
                author_list.push(author);
                console.log(`Nuovo post creato per l'autore: ${author}`);
            });
            // Inizia la lettura del file immagine come Data URL
            reader.readAsDataURL(imageFile);
        } else {
            // Se non c'è un'immagine per un nuovo post, mostra un avviso
            window.alert("Per creare un nuovo post è necessario caricare un'immagine!");
            return; // Non resettare il form se c'è un errore, così l'utente può correggere
        }
    }

    // Resetta i campi del form dopo il submit (sia per update che per nuovo post)
    e.target.reset();
});

// TODO (compito): Implementare l'aggiunta di commenti visualizzati sotto al post
// quando si preme il bottone blu "Post" nel form dei commenti.