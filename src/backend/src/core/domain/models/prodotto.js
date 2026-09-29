// src/backend/src/core/domain/models/prodotto.js

class Prodotto {
    constructor(id, nome, prezzo, descrizione = null) {
        if (!nome || nome.trim() === "") throw new Error("Il nome del prodotto è obbligatorio");
        if (prezzo <= 0) throw new Error("Il prezzo deve essere maggiore di zero");

        this.id = id;
        this.nome = nome;
        this.prezzo = parseFloat(prezzo);
        this.descrizione = descrizione;
    }
}

module.exports = Prodotto;
