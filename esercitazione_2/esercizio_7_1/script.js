// TODO per casa: inserire check che il valore di input non sia vuoto, in quel caso rifiutarlo e mostrare un alert
function formSubmit(e) {
    e.preventDefault();
    // estraiamo il valroe da inserire
    text = e.target.item.value;
    // cancelliamo il testo dalla barra di input e la rimettiamo in focus
    e.target.item.value = "";
    e.target.item.focus()
    // usiamo firstElementChild per essere sicuri di avere il primo nodo tra i figli che è un elemento e quindi non un nodo di altro tipo
    console.log(document.getElementById("shopping-list").firstElementChild)
    item = document.createElement('li')
    textNode = document.createTextNode(text)
    button = document.createElement('button')
    button.setAttribute('type', 'button')
    buttonText = document.createTextNode("Rimuovi")
    button.appendChild(buttonText)
    button.setAttribute('class', 'button')
    item.appendChild(textNode)
    item.appendChild(button)
    document.getElementById("shopping-list").firstElementChild.appendChild(item)
    // add the Event Listener to remove the
    button.addEventListener('click', removeElement)
}

function removeElement(e) {
    // il target dell'evento click è il bottone, ma noi dobbiamo accedere e rimuovere il genitore cioè l'intero elemento li che lo contiene
    e.target.parentElement.remove()
}

form = document.getElementsByTagName('form')[0]
form.addEventListener('submit', formSubmit)