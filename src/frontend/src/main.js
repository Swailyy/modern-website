// src/frontend/src/main.js
import { creaRigaProdotto } from './components/molecules/rigaProdotto.js';
import { inizializzaFormProdotto } from './components/organisms/formProdotto.js';
import { creaCampoRicerca } from './components/atoms/campoRicerca.js';
import { mostraNotifica } from './components/atoms/toast.js';

let tuttiIProdotti = [];
let filtroAttuale = '';

function renderizzaProdotti() {
    const listaUl = document.getElementById('lista-prodotti');
    listaUl.innerHTML = ''; 

    const prodottiFiltrati = tuttiIProdotti.filter(prodotto => 
        prodotto.nome.toLowerCase().includes(filtroAttuale.toLowerCase())
    );

    if (prodottiFiltrati.length === 0) {
        listaUl.innerHTML = '<li>Nessun prodotto corrisponde alla ricerca.</li>';
        return;
    }

    prodottiFiltrati.forEach(prodotto => {
        const riga = creaRigaProdotto(prodotto, eliminaProdotto);
        listaUl.appendChild(riga);
    });
}

async function caricaProdotti() {
    try {
        const response = await fetch('http://localhost:3000/api/prodotti');
        tuttiIProdotti = await response.json();
        renderizzaProdotti();
    } catch (error) {
        console.error("Errore durante il recupero dei prodotti:", error);
        mostraNotifica("Errore nel caricamento dei prodotti dal server.", 'errore');
    }
}

// 2. MODIFICA LA FUNZIONE ELIMINA PER REGISTRARE IL FEEDBACK VISIVO
async function eliminaProdotto(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/prodotti/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            mostraNotifica("Prodotto rimosso con successo."); // <--- NOTIFICA DI ELIMINAZIONE
            caricaProdotti(); 
        } else {
            mostraNotifica("Impossibile eliminare il prodotto.", 'errore');
        }
    } catch (error) {
        console.error("Errore durante l'eliminazione:", error);
        mostraNotifica("Errore di rete durante l'eliminazione.", 'errore');
    }
}

const contenitoreRicerca = document.getElementById('barra-ricerca-container');
if (contenitoreRicerca) {
    const barraRicerca = creaCampoRicerca((testoDigitato) => {
        filtroAttuale = testoDigitato;
        renderizzaProdotti();
    });
    contenitoreRicerca.appendChild(barraRicerca);
}

inizializzaFormProdotto(caricaProdotti);
document.addEventListener('DOMContentLoaded', caricaProdotti);
