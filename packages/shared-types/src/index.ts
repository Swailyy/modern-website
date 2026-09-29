// packages/shared-types/src/index.ts

/**
 * Interfaccia core aziendale che definisce la struttura rigida 
 * di un Prodotto all'interno dell'intero ecosistema del Monorepo.
 */
export interface IProdotto {
    id: number;
    nome: string;
    prezzo: number;
    descrizione?: string | null;
    createdAt?: string;
}

/**
 * Tipo dedicato alla validazione dei dati in entrata (DTO)
 * utilizzato per i moduli di creazione prodotti nel Frontend e nel Backend.
 */
export type CreateProdottoInput = Omit<IProdotto, 'id' | 'createdAt'>;
