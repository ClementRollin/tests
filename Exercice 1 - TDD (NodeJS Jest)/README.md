# Exercice 1 – TDD (Node.js & Jest)

Ce projet est un exercice de **Test-Driven Development (TDD)** en Node.js, utilisant **Jest** pour les tests unitaires. L'objectif est de développer un **service client** (`clientService`) permettant de gérer (Créer, Lire, Mettre à jour, Supprimer) des clients tout en assurant la validation des données.

---

## 📂 Structure du projet

```
exercice-1-tdd/
├── src/
│   └── clientService.js      # Implémentation du service client
├── tests/
│   └── clientService.test.js # Suite de tests Jest
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Prérequis

* Node.js (>= 14.x) et npm installés

---

## 🔧 Installation

1. Clonez le dépôt :

   ```bash
   git clone <url-du-dépôt>
   cd exercice-1-tdd
   ```
2. Installez les dépendances :

   ```bash
   npm install
   ```

---

## 🧪 Exécution des tests

Pour lancer la suite de tests Jest :

```bash
npm test
```

Tous les tests doivent passer pour valider la bonne implémentation.

---

## 🛠️ Fonctionnalités du service client

* **addClient(data)**

    * Crée un nouveau client avec un `id` auto-incrémenté.
    * Champs obligatoires : `firstName`, `lastName`, `email`.
    * Validations : format email, format téléphone (optionnel), unicité de l’email.

* **getClients()**

    * Retourne la liste de tous les clients.

* **updateClient(id, updates)**

    * Met à jour les données d’un client existant.
    * Vérifie l’existence du client et la validité/unicité de l’email si modifié.

* **deleteClient(id)**

    * Supprime un client par son `id`.

* **resetClients()** (usage interne pour les tests)

    * Réinitialise le stockage en mémoire et le compteur d’ID.

---

## 📝 Contribuer

1. Forker ce dépôt.
2. Créer une branche feature : `git checkout -b feat/ma-fonctionnalite`
3. Committer vos changements : `git commit -m "Ajout : ..."`
4. Pousser : `git push origin feat/ma-fonctionnalite`
5. Ouvrir une Pull Request.

---

## 🏷️ Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.