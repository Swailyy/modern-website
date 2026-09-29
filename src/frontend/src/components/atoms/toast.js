// src/frontend/src/components/atoms/toast.js

export function mostraNotifica(messaggio, tipo = 'successo') {
    let contenitore = document.getElementById('toast-container');
    if (!contenitore) {
        contenitore = document.createElement('div');
        contenitore.id = 'toast-container';
        contenitore.style.position = 'fixed';
        contenitore.style.top = '20px';
        contenitore.style.right = '20px';
        contenitore.style.display = 'flex';
        contenitore.style.flexDirection = 'column';
        contenitore.style.gap = '10px';
        // Alziamo drasticamente il livello visivo per portarlo in primissimo piano
        contenitore.style.zIndex = '99999'; 
        document.body.appendChild(contenitore);
    }

    const toast = document.createElement('div');
    toast.textContent = messaggio;
    
    // Stile avanzato per forzare la visibilità sopra il tema scuro
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '8px';
    toast.style.color = '#ffffff';
    toast.style.fontWeight = 'bold';
    toast.style.fontSize = '14px';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)';
    toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.9)';
    toast.style.minWidth = '250px';
    toast.style.textAlign = 'center';

    if (tipo === 'successo') {
        toast.style.backgroundColor = '#10b981'; // Verde Smeraldo brillante
        toast.style.border = '1px solid #059669';
    } else {
        toast.style.backgroundColor = '#ef4444'; // Rosso brillante
        toast.style.border = '1px solid #dc2626';
    }

    contenitore.appendChild(toast);

    // Effetto comparsa pop-up
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
    }, 50);

    // Effetto scomparsa
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px) scale(0.9)';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}
