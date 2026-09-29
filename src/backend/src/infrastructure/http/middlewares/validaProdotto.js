// src/backend/src/infrastructure/http/middlewares/validaProdotto.js
const CreateProdottoDto = require('../../../utils/prodottoDto');
const logger = require('../../../config/logger'); // <--- IMPORTA IL LOGGER

function middlewareValidaProdotto(req, res, next) {
    const dto = new CreateProdottoDto(req.body);

    if (!dto.valida()) {
        // Registro l'avviso nel file combined.log automaticamente
        logger.warn(`Tentativo di inserimento dati non validi bloccato: ${dto.errori.join(', ')}`);
        return res.status(400).json({ 
            errore: "Validazione fallita", 
            dettagli: dto.errori 
        });
    }

    req.body = {
        nome: dto.nome.trim(),
        prezzo: dto.prezzo,
        descrizione: dto.descrizione
    };

    next();
}

module.exports = middlewareValidaProdotto;
