# 💰 Financial Services App

Une application web full-stack pour les calculs financiers incluant la conversion de devises, le calcul de TVA et l'application de remises.

## 🚀 Fonctionnalités

- **Conversion de devises** : Conversion entre EUR, USD et GBP
- **Calcul de TVA** : Calcul du prix TTC à partir du prix HT et du taux de TVA
- **Calcul de remises** : Application d'un pourcentage de remise sur un prix

## 🛠️ Technologies utilisées

### Backend
- **Node.js** avec Express.js
- **CORS** pour la gestion des requêtes cross-origin
- API REST avec validation des paramètres

### Frontend
- **React.js** avec hooks (useState)
- **React Bootstrap** pour l'interface utilisateur
- **Axios** pour les requêtes HTTP
- **Bootstrap** pour le design responsive

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Un navigateur web moderne

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone <url-du-repository>
cd financial-services-app
```

### 2. Installation du backend
```bash
cd backend
npm install
```

### 3. Installation du frontend
```bash
cd ../frontend
npm install
```

## 🚀 Démarrage de l'application

### 1. Démarrer le serveur backend
```bash
cd backend
npm start
```
Le serveur backend sera accessible sur `http://localhost:3000`

### 2. Démarrer l'application frontend
```bash
cd frontend
npm start
```
L'application frontend sera accessible sur `http://localhost:3001` (ou 3002)

### 3. Vérification de la connexion
- Backend : Visitez `http://localhost:3000/health` pour vérifier que l'API fonctionne
- Frontend : L'application s'ouvrira automatiquement dans votre navigateur

## 📁 Structure du projet

```
financial-services-app/
├── backend/
│   ├── index.js                 # Point d'entrée du serveur
│   ├── routes.js                # Définition des routes API
│   ├── services/
│   │   └── financialService.js  # Logique métier
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js               # Composant principal
│   │   ├── index.js             # Point d'entrée React
│   │   ├── services/
│   │   │   └── api.js           # Configuration Axios
│   │   └── components/
│   │       ├── ConvertForm.js   # Formulaire de conversion
│   │       ├── TvaForm.js       # Formulaire TVA
│   │       └── DiscountForm.js  # Formulaire remise
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### GET /health
Vérification de l'état de l'API
```
Response: { "status": "OK", "message": "API is running" }
```

### GET /convert
Conversion de devises
```
Paramètres: from, to, amount
Exemple: /convert?from=EUR&to=USD&amount=100
Response: {
  "from": "EUR",
  "to": "USD", 
  "originalAmount": 100,
  "convertedAmount": 110
}
```

### GET /tva
Calcul de la TVA
```
Paramètres: ht, taux
Exemple: /tva?ht=100&taux=20
Response: {
  "ht": 100,
  "taux": 20,
  "ttc": 120
}
```

### GET /remise
Application d'une remise
```
Paramètres: prix, pourcentage
Exemple: /remise?prix=100&pourcentage=10
Response: {
  "prixInitial": 100,
  "pourcentage": 10,
  "prixFinal": 90
}
```

## ⚙️ Configuration

### Variables d'environnement

#### Backend (.env optionnel)
```
PORT=3000
```

#### Frontend (.env optionnel)
```
REACT_APP_API_URL=http://localhost:3000
```

### Taux de change (backend/services/financialService.js)
Les taux de change sont actuellement fixes :
- EUR → USD : 1.1
- USD → EUR : 0.909
- USD → GBP : 0.8
- GBP → USD : 1.25

## 🔒 Sécurité et validation

- Validation des paramètres côté backend
- Gestion des erreurs avec messages explicites
- Vérification des types et valeurs positives
- CORS configuré pour accepter les requêtes du frontend

## 🐛 Résolution des problèmes

### Erreur de connexion API
1. Vérifiez que le backend est démarré sur le port 3000
2. Testez l'endpoint `/health` dans votre navigateur
3. Vérifiez la configuration CORS dans `backend/index.js`

### Erreur de conversion non supportée
Les conversions supportées sont limitées à EUR, USD et GBP. Vérifiez les taux dans `financialService.js`.

### Port déjà utilisé
Si le port 3000 ou 3001 est occupé, modifiez la variable `PORT` ou utilisez :
```bash
PORT=3001 npm start  # pour le backend
```

## 🤝 Contribution

1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 Notes de développement

- L'application utilise des taux de change fixes pour la démonstration
- Pour une utilisation en production, intégrez une API de taux de change en temps réel
- Les calculs sont arrondis à 2 décimales
- L'interface est responsive grâce à Bootstrap

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.