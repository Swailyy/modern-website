// src/frontend/src/components/molecules/rigaProdotto.js
import { creaBadgePrezzo } from '../atoms/badgePrezzo.js';
import { creaBottoneElimina } from '../atoms/bottoneElimina.js';

export function creaRigaProdotto(prodotto, onEliminaCorrente) {
    const li = document.createElement('li');
    
    // Nome del prodotto
    const nomeSpan = document.createElement('span');
    nomeSpan.className = 'prodotto-nome';
    nomeSpan.textContent = prodotto.nome;

    // Contenitore per allineare prezzo e bottone a destra
    const azioniDiv = document.createElement('div');
    azioniDiv.style.display = 'flex';
    azioniDiv.style.alignItems = 'center';
    azioniDiv.style.gap = '12px';

    // Inseriamo gli atomi dentro la molecola
    const badgePrezzo = creaBadgePrezzo(prodotto.prezzo);
    const bottoneElimina = creaBottoneElimina(() => onEliminaCorrente(prodotto.id));

    azioniDiv.appendChild(badgePrezzo);
    azioniDiv.appendChild(bottoneElimina);
    
    li.appendChild(nomeSpan);
    li.appendChild(azioniDiv);
    
    return li;
}
