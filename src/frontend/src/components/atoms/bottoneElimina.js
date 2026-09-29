// src/frontend/src/components/atoms/bottoneElimina.js

export function creaBottoneElimina(onClickHandler) {
    const bottone = document.createElement('button');
    bottone.textContent = 'Elimina';
    bottone.className = 'btn-elimina';
    
    // Variabile interna all'atomo per tenere traccia se è il primo o il secondo click
    let attesaConferma = false;
    let timer;

    bottone.onclick = (e) => {
        e.stopPropagation(); // Evita di attivare altri eventi sulla riga

        if (!attesaConferma) {
            // PRIMO CLICK: Chiediamo conferma graficamente cambiando il bottone
            attesaConferma = true;
            bottone.textContent = 'Sicuro?';
            bottone.style.backgroundColor = '#eab308'; // Diventa giallo
            bottone.style.color = '#0f172a'; // Testo scuro leggibile
            
            // Se l'utente non clicca entro 3 secondi, resetta il bottone
            timer = setTimeout(() => {
                attesaConferma = false;
                bottone.textContent = 'Elimina';
                bottone.style.backgroundColor = ''; // Torna al rosso del CSS
                bottone.style.color = '';
            }, 3000);
            
        } else {
            // SECONDO CLICK: L'utente ha confermato, cancelliamo il timer e attiviamo l'eliminazione
            clearTimeout(timer);
            onClickHandler();
        }
    };

    return bottone;
}
