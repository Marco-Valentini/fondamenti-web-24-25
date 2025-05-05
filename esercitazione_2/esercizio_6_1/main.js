const persone =
    [{nome: "Franco", cognome: "Verdi", professione: "ingegnere"},
        {nome: "Mario", cognome: "Rossi", professione: "impiegato"},
        {nome: "Giuseppe", cognome: "Verda", professione: "operaio"},
        {nome: "Marco", cognome: "Neri", professione: "insegnante"}]

// possiamo usare gli oepratori > e < per confrontare l'ordine alfabetico delle stringhe
function compareFn(a, b) {
    if (a.cognome > b.cognome) {
        return 1
    } else if (a.cognome < b.cognome) {
        return -1
    } else {
        return 0
    }
}

console.log(persone)

persone.sort(compareFn)
// alternativa usando una arrow function anonima,
persone.sort((a, b) => a.cognome > b.cognome ? 1 : -1)

console.log(persone)