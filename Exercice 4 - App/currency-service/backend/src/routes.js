const express = require('express');
const {
    convertCurrency,
    calculateTTC,
    applyDiscount
} = require('./services/financialService');

const router = express.Router();

// Route de test pour vérifier la connexion
router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is running' });
});

router.get('/convert', (req, res) => {
    try {
        const { from, to, amount } = req.query;

        // Validation des paramètres
        if (!from || !to || !amount) {
            return res.status(400).json({
                error: 'Paramètres manquants',
                message: 'from, to et amount sont requis'
            });
        }

        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return res.status(400).json({
                error: 'Montant invalide',
                message: 'Le montant doit être un nombre positif'
            });
        }

        const value = convertCurrency(from, to, numAmount);
        res.json({
            from,
            to,
            originalAmount: numAmount,
            convertedAmount: value
        });
    } catch (error) {
        console.error('Erreur conversion:', error);
        res.status(400).json({
            error: 'Erreur de conversion',
            message: error.message
        });
    }
});

router.get('/tva', (req, res) => {
    try {
        const { ht, taux } = req.query;

        if (!ht || !taux) {
            return res.status(400).json({
                error: 'Paramètres manquants',
                message: 'ht et taux sont requis'
            });
        }

        const numHt = Number(ht);
        const numTaux = Number(taux);

        if (isNaN(numHt) || isNaN(numTaux) || numHt < 0 || numTaux < 0) {
            return res.status(400).json({
                error: 'Paramètres invalides',
                message: 'HT et taux doivent être des nombres positifs'
            });
        }

        const ttc = calculateTTC(numHt, numTaux);
        res.json({ ht: numHt, taux: numTaux, ttc });
    } catch (error) {
        console.error('Erreur calcul TVA:', error);
        res.status(400).json({
            error: 'Erreur de calcul TVA',
            message: error.message
        });
    }
});

router.get('/remise', (req, res) => {
    try {
        const { prix, pourcentage } = req.query;

        if (!prix || !pourcentage) {
            return res.status(400).json({
                error: 'Paramètres manquants',
                message: 'prix et pourcentage sont requis'
            });
        }

        const numPrix = Number(prix);
        const numPourcentage = Number(pourcentage);

        if (isNaN(numPrix) || isNaN(numPourcentage) || numPrix < 0 || numPourcentage < 0) {
            return res.status(400).json({
                error: 'Paramètres invalides',
                message: 'Prix et pourcentage doivent être des nombres positifs'
            });
        }

        const finalPrice = applyDiscount(numPrix, numPourcentage);
        res.json({
            prixInitial: numPrix,
            pourcentage: numPourcentage,
            prixFinal: finalPrice
        });
    } catch (error) {
        console.error('Erreur calcul remise:', error);
        res.status(400).json({
            error: 'Erreur de calcul remise',
            message: error.message
        });
    }
});

module.exports = router;