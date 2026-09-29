// src/backend/src/infrastructure/database/repositories/jsonProdottoRepository.js
const ProdottoRepository = require('../../../core/domain/repositories/prodottoRepository');
const Prodotto = require('../../../core/domain/models/prodotto');
const fs = require('fs');
const path = require('path');

class JsonProdottoRepository extends ProdottoRepository {
    constructor() {
        super();
        
        // Trova la cartella radice "modern-website" tagliando il percorso attuale prima di "src"
        const radiceProgetto = __dirname.split(path.sep + 'src')[0];
        
        // Unisce la radice con la cartella logs che si trova proprio lì, accanto a src
        this.databasePath = path.join(radiceProgetto, 'logs', 'backend', 'prodotti.json');
    }

    _leggiFile() {
        try {
            if (!fs.existsSync(this.databasePath)) {
                console.error("⚠️ Il file non esiste nel percorso calcolato:", this.databasePath);
                return [];
            }
            const datiGrezzi = fs.readFileSync(this.databasePath, 'utf8');
            return JSON.parse(datiGrezzi);
        } catch (error) {
            console.error("❌ Errore interno durante la lettura del file DB JSON:", error.message);
            return [];
        }
    }

    _scriviFile(dati) {
        try {
            fs.writeFileSync(this.databasePath, JSON.stringify(dati, null, 2), 'utf8');
        } catch (error) {
            console.error("❌ Errore interno durante la scrittura del file DB JSON:", error.message);
        }
    }

    async findMany() {
        const liste = this._leggiFile();
        return liste.map(p => new Prodotto(p.id, p.nome, p.prezzo, p.descrizione));
    }

    async save(prodotto) {
        const prodotti = this._leggiFile();
        const nuovoId = prodotti.length > 0 ? Math.max(...prodotti.map(p => p.id)) + 1 : 1;
        
        prodotto.id = nuovoId;
        prodotti.push({
            id: prodotto.id,
            nome: prodotto.nome,
            prezzo: prodotto.prezzo,
            descrizione: prodotto.descrizione
        });
        
        this._scriviFile(prodotti);
        return prodotto;
    }

    async delete(id) {
        let prodotti = this._leggiFile();
        const esiste = prodotti.some(p => p.id === id);
        if (!esiste) throw new Error("Prodotto non trovato nel database");

        prodotti = prodotti.filter(p => p.id !== id);
        this._scriviFile(prodotti);
        return true;
    }
}

module.exports = JsonProdottoRepository;
