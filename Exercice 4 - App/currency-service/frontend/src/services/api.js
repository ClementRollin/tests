import axios from 'axios';

// Configuration de l'URL de base - ajustez selon votre configuration
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Configuration axios avec gestion d'erreur globale
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Intercepteur pour la gestion des erreurs
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export function convertCurrency(from, to, amount) {
    return api.get('/convert', { params: { from, to, amount } });
}

export function calculateTTC(ht, taux) {
    return api.get('/tva', { params: { ht, taux } });
}

export function applyDiscount(prix, pourcentage) {
    return api.get('/remise', { params: { prix, pourcentage } });
}