// src/frontend/src/components/atoms/campoRicerca.js

export function creaCampoRicerca(onInputHandler) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'input-ricerca';
    input.placeholder = '🔍 Cerca un prodotto per nome...';
    
    // Applichiamo uno stile in linea coordinato con la nostra Dark Mode minimale
    input.style.width = '100%';
    input.style.padding = '12px';
    input.style.marginBottom = '20px';
    input.style.borderRadius = '8px';
    input.style.border = '1px solid #334155';
    input.style.backgroundColor = '#0f172a';
    input.style.color = 'white';
    input.style.fontSize = '14px';

    // Intercettiamo l'evento di digitazione in tempo reale
    input.addEventListener('input', (e) => {
        onInputHandler(e.target.value);
    });

    return input;
}
