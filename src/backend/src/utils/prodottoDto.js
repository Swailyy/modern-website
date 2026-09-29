// src/backend/src/utils/prodottoDto.js

class CreateProdottoDto {
    constructor(body) {
        this.nome = body.nome;
        this.prezzo = body.prezzo;
        this.descrizione = body.descrizione || null;
        this.errori = [];
    }

    valida() {
        // Regola 1: Il nome deve esistere e non essere una stringa vuota
        if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
            this.errori.push("Il nome del prodotto è obbligatorio e deve essere un testo valido.");
        }

        // Regola 2: Il prezzo deve essere un numero valido superiore a zero
        const prezzoConvertito = parseFloat(this.prezzo);
        if (isNaN(prezzoConvertito) || prezzoConvertito <= 0) {
            this.errori.push("Il prezzo è obbligatorio e deve essere un numero maggiore di zero.");
        } else {
            this.prezzo = prezzoConvertito; // Salviamo il prezzo già convertito in numero
        }

        // Ritorna true se non ci sono errori, altrimenti false
        return this.errori.length === 0;
    }
}

module.exports = CreateProdottoDto;
