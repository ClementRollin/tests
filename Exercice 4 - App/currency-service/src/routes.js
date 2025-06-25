const express = require('express');
const {
    convertCurrency,
    calculateTTC,
    applyDiscount
} = require('./services/financialService');

const router = express.Router();

router.get('/convert', (req, res) => {
    const { from, to, amount } = req.query;
    const value = convertCurrency(from, to, Number(amount));
    res.json({
        from,
        to,
        originalAmount: Number(amount),
        convertedAmount: value
    });
});

router.get('/tva', (req, res) => {
    const { ht, taux } = req.query;
    const ttc = calculateTTC(Number(ht), Number(taux));
    res.json({ ht: Number(ht), taux: Number(taux), ttc });
});

router.get('/remise', (req, res) => {
    const { prix, pourcentage } = req.query;
    const finalPrice = applyDiscount(Number(prix), Number(pourcentage));
    res.json({ prixInitial: Number(prix), pourcentage: Number(pourcentage), prixFinal: finalPrice });
});

module.exports = router;