// src/backend/src/infrastructure/http/routes/prodottoRoutes.js
const express = require('express');
const ProdottoController = require('../controllers/prodottoController');
const JsonProdottoRepository = require('../../database/repositories/jsonProdottoRepository');
const validaProdotto = require('../middlewares/validaProdotto'); // <--- 1. IMPORTA IL MIDDLEWARE

const router = express.Router();

const repository = new JsonProdottoRepository();
const controller = new ProdottoController(repository);

router.get('/', controller.getAll);

// 2. APPLICA IL MIDDLEWARE QUI (Fa da scudo prima di arrivare al controller)
router.post('/', validaProdotto, controller.create);

router.delete('/:id', controller.delete);

module.exports = router;
