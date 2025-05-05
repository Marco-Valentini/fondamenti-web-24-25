// iniziamo a ragionare con le funzioni costruttore al post delle classi per prepararci a React
function Present(containerElement){
    // definiamo la funzione da assegnare al listener

    this._openPresent = function(event){
        this.image.src = "gift.png";
        this.image.removeEventListener('click', this._openPresent);
        window.counter++;
        // commentare il seguente if statement per usare approccio 2
        if (window.counter === window.arr.length) {
            alert("Tutti i pacchi sono stati aperti")
        }
    }.bind(this);

    this.containerElement = containerElement;
    // create an image and append it to container
    this.image = document.createElement("img");
    this.image.src = "giftbox.png";
    this.image.addEventListener('click', this._openPresent);
    // De-commenta la seguente riga per opzione 2
    // this.image.addEventListener('click', check);
    this.containerElement.append(this.image);
}
// definiamo un contatore che viene associato direttamente all'oggetto globale
window.counter = 0
// opzione 2: check come arrow function
// let check = () => this.counter === this.arr.length? alert("Tutti i pacchi sono stati aperti"): null;
container = document.getElementsByTagName("body")[0];
let present1 = new Present(container);
let present2 = new Present(container);
let present3 = new Present(container);
let present4 = new Present(container);
let present5 = new Present(container);

window.arr = [present1, present2, present3, present4, present5];
