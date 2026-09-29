// src/frontend/src/components/organisms/formProdotto.js
import { mostraNotifica } from '../atoms/toast.js';

export function inizializzaFormProdotto(onSalvaSuccesso) {
    const form = document.getElementById('form-prodotto');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nomeInput = document.getElementById('input-nome');
        const prezzoInput = document.getElementById('input-prezzo');

        const datiProdotto = {
            nome: nomeInput.value,
            prezzo: prezzoInput.value
        };

        try {
            const response = await fetch('http://localhost:3000/api/prodotti', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datiProdotto)
            });

            if (response.ok) {
                nomeInput.value = '';
                prezzoInput.value = '';
                
                // 2. MOSTRA IL MESSAGGIO VERDE DI SUCCESSO
                mostraNotifica(`Prodotto "${datiProdotto.nome}" aggiunto con successo!`);
                
                onSalvaSuccesso();
            } else {
                // Se la validazione del nostro Middleware DTO fallisce, mostriamo l'errore rosso
                const erroreDati = await response.json();
                mostraNotifica(erroreDati.errore || "Errore nel salvataggio", 'errore');
            }
        } catch (error) {
            console.error("Errore di rete nell'Organismo Form:", error);
            mostraNotifica("Impossibile connettersi al server.", 'errore');
        }
    });
}
