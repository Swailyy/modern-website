// src/frontend/src/components/atoms/badgePrezzo.js

export function creaBadgePrezzo(prezzo) {
    const span = document.createElement('span');
    span.className = 'prodotto-prezzo';
    span.textContent = `€${parseFloat(prezzo).toFixed(2)}`;
    return span;
}
