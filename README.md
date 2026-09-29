# 🚀 Modern Monorepo Website - Enterprise Architecture

Benvenuto nel repository di **Modern Website**, un'applicazione full-stack integrata all'interno di una struttura **Monorepo** aziendale. Il progetto è stato ingegnerizzato seguendo i più alti standard industriali per garantire scalabilità, sicurezza, manutenibilità e isolamento dell'infrastruttura.

---

## 🛠️ Architettura e Tecnologie Core

### 📐 Backend: Clean Architecture (Architettura Esagonale)
Il server Node.js/Express è stato disaccoppiato seguendo i canoni del **Domain-Driven Design (DDD)**:
- **Core Domain:** Modelli e contratti (Repositories) puri che definiscono le regole del business senza dipendenze esterne.
- **Use Cases:** Logica applicativa isolata per singola azione (`getProdotti`, `createProdotto`, `deleteProdotto`).
- **Infrastructure:** Adattatori fisici per il database JSON su disco e strato HTTP strutturato con **Controllers** e **Routers** dedicati.
- **Security Middleware:** Implementazione di un sistema di validazione **DTO (Data Transfer Object)** per blindare le API da input corrotti.
- **Enterprise Logging:** Tracciamento persistente dei flussi e degli errori in formato JSON nei file `combined.log` e `error.log` tramite la libreria **Winston**.

### 🎨 Frontend: Atomic Design & Moduli Variabili
L'interfaccia grafica (Dark Mode minimale) è stata scomposta in componenti riutilizzabili e indipendenti:
- **Atoms:** Mattoni base (`badgePrezzo`, `campoRicerca`, `bottoneElimina` con stato grafico "Doppio Click di Sicurezza").
- **Molecules:** Strutture composite come la riga prodotto (`rigaProdotto`).
- **Organisms:** Blocchi logici complessi come il modulo di inserimento (`formProdotto`).
- **Performance:** Algoritmo di ricerca e filtraggio in tempo reale eseguito localmente in memoria per azzerare il carico di richieste di rete.

### 🐳 DevOps & Cloud Infrastructure (Infrastructure as Code)
- **Docker & Compose:** Containerizzazione completa dell'applicazione con gestione dei volumi persistenti per la sincronizzazione dei log e dei dati.
- **Terraform (IaC):** Configurazione automatizzata dei server remoti, del firewall (Security Groups) e della rete isolata (VPC) sul Cloud **Amazon AWS**.
- **GitHub Actions (CI/CD):** Pipeline automatizzate per il controllo sintattico e test di build ad ogni push (`ci.yml`) e schemi di deployment continuo (`cd.yml`).

---

## 📁 Struttura del Prorepo

```text
modern-website/
├── .github/workflows/          # Pipeline CI/CD (GitHub Actions)
├── infrastructure/
│   └── terraform/              # Infrastruttura Cloud come Codice (AWS)
├── logs/backend/               # File persistenti di Log (.log) e DB (.json)
├── packages/
│   └── shared-types/           # Contratti dei dati TypeScript condivisi
└── src/
    ├── backend/src/
    │   ├── core/               # Dominio e Casi d'Uso (Esagonale)
    │   └── infrastructure/     # Database Repository, Controller e Router
    └── frontend/
        ├── public/             # File HTML statici
        └── src/components/     # UI strutturata in Atomic Design
```

---

## 🚀 Come Avviare il Progetto Localmente

### 1. Avvio Standard (Sviluppo)
Installa le dipendenze nella radice ed avvia l'applicazione unificata:
```bash
npm install
npm run dev
```
Il sito sarà accessibile su: `http://localhost:3000`

### 2. Avvio Isolato (Infrastruttura Docker)
Se sul tuo sistema è attivo Docker Desktop, puoi compilare ed eseguire l'intero ecosistema in modalità containerizzata con un solo comando:
```bash
npm run docker:build
npm run docker:up
```
Per spegnere i servizi: `npm run docker:down`
