// src/backend/src/core/use-cases/createProdotto.js
const Prodotto = require('../domain/models/prodotto');

class CreateProdotto {
    constructor(prodottoRepository) {
        this.prodottoRepository = prodottoRepository; // Corretto refuso 'productoRepository'
    }

    async execute(dati) {
        const nuovoProdotto = new Prodotto(null, dati.nome, dati.prezzo, dati.descrizione);
        return await this.prodottoRepository.save(nuovoProdotto);
    }
}

module.exports = CreateProdotto;
