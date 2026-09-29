// src/backend/src/core/use-cases/getProdotti.js

class GetProdotti {
    constructor(prodottoRepository) {
        this.prodottoRepository = prodottoRepository; // Corretto refuso 'productoRepository'
    }

    async execute() {
        return await this.prodottoRepository.findMany();
    }
}

module.exports = GetProdotti;
