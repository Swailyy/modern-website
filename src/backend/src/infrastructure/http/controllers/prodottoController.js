// src/backend/src/infrastructure/http/controllers/prodottoController.js
const GetProdotti = require('../../../core/use-cases/getProdotti');
const CreateProdotto = require('../../../core/use-cases/createProdotto');
const DeleteProdotto = require('../../../core/use-cases/deleteProdotto');
const logger = require('../../../config/logger'); // <--- IMPORTA IL LOGGER

class ProdottoController {
    constructor(prodottoRepository) {
        this.prodottoRepository = prodottoRepository;
    }

    getAll = async (req, res) => {
        try {
            const useCase = new GetProdotti(this.prodottoRepository);
            const prodotti = await useCase.execute();
            logger.info(`Lista prodotti richiesta con successo. Totale: ${prodotti.length}`);
            res.json(prodotti);
        } catch (errore) {
            logger.error(`Errore nel caricamento prodotti: ${errore.message}`);
            res.status(500).json({ errore: errore.message });
        }
    };

    create = async (req, res) => {
        try {
            const useCase = new CreateProdotto(this.prodottoRepository);
            const nuovoProdotto = await useCase.execute(req.body);
            logger.info(`Nuovo prodotto inserito a database: ID ${nuovoProdotto.id} - ${nuovoProdotto.nome}`);
            res.status(201).json(nuovoProdotto);
        } catch (errore) {
            logger.error(`Errore nella creazione prodotto: ${errore.message}`);
            res.status(400).json({ errore: errore.message });
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const useCase = new DeleteProdotto(this.prodottoRepository);
            await useCase.execute(id);
            logger.info(`Prodotto eliminato con successo: ID ${id}`);
            res.json({ messaggio: "Prodotto eliminato con successo" });
        } catch (errore) {
            logger.error(`Errore nell'eliminazione del prodotto ID ${req.params.id}: ${errore.message}`);
            res.status(404).json({ errore: errore.message });
        }
    };
}

module.exports = ProdottoController;
