// src/backend/src/config/logger.js
const winston = require('winston');
const path = require('path');

// Identifichiamo la cartella radice per raggiungere la cartella logs globale
const radiceProgetto = __dirname.split(path.sep + 'src');
const logsFolder = path.join(radiceProgetto[0], 'logs', 'backend');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        // 1. Scrive solo gli errori gravi dentro error.log
        new winston.transports.File({ 
            filename: path.join(logsFolder, 'error.log'), 
            level: 'error' 
        }),
        // 2. Scrive TUTTE le operazioni (info, warn, error) dentro combined.log
        new winston.transports.File({ 
            filename: path.join(logsFolder, 'combined.log') 
        })
    ]
});

// Se siamo in modalità sviluppo, stampa i log anche sul terminale CMD colorati
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
