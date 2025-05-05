const persona = {
    nome: "Mario",
    cognome: "Rossi",
    nomeCognome: function() {
        return this.nome + " " + this.cognome;
    }
};

function saluta(nomeCognome) {
    console.log("Ciao " + nomeCognome());
}

saluta(persona.nomeCognome)
// colleghiamo con bind la funzione all'oggetto a cui il this deve fare riferimento
persona.nomeCognome = persona.nomeCognome.bind(persona);
saluta(persona.nomeCognome);