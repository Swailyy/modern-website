// src/backend/src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const prodottoRoutes = require('./infrastructure/http/routes/prodottoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Forniamo l'accesso statico ai file del frontend
app.use('/src', express.static(path.join(__dirname, '../../frontend/src')));
app.use('/public', express.static(path.join(__dirname, '../../frontend/public')));

// Serviamo l'interfaccia iniziale del sito sulla rotta base
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// Colleghiamo il blocco delle API dedicate ai prodotti sotto il percorso /api/prodotti
app.use('/api/prodotti', prodottoRoutes);

module.exports = app;
