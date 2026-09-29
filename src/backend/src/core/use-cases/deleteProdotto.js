// src/backend/src/core/use-cases/deleteProdotto.js

class DeleteProdotto {
    constructor(prodottoRepository) {
        this.prodottoRepository = prodottoRepository; // Corretto refuso 'productoRepository'
    }

    async execute(id) {
        return await this.prodottoRepository.delete(id);
    }
}

module.exports = DeleteProdotto;
