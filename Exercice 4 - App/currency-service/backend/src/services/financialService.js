// Taux de conversion fixes
const RATES = {
    'EUR:USD': 1.1,
    'USD:EUR': 1 / 1.1,
    'USD:GBP': 0.8,
    'GBP:USD': 1 / 0.8
};

function convertCurrency(from, to, amount) {
    if (amount < 0) throw new Error('Le montant doit être positif');
    const key = `${from}:${to}`;
    const rate = RATES[key];
    if (!rate) throw new Error('Conversion non supportée');
    return Number((amount * rate).toFixed(2));
}

function calculateTTC(ht, taux) {
    if (ht < 0 || taux < 0) throw new Error('HT et taux doivent être positifs');
    return Number((ht * (1 + taux / 100)).toFixed(2));
}

function applyDiscount(prix, pourcentage) {
    if (prix < 0 || pourcentage < 0) throw new Error('Prix et pourcentage doivent être positifs');
    return Number((prix * (1 - pourcentage / 100)).toFixed(2));
}

module.exports = { convertCurrency, calculateTTC, applyDiscount };