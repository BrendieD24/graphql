# 🚀 Zone01 GraphQL Profile

Une application web React permettant à un utilisateur de Zone01 de se connecter et de visualiser son profil personnel grâce à des requêtes GraphQL. Ce projet met en pratique l'utilisation de JWT, de l'authentification, de l'API GraphQL, et de la visualisation de données en SVG.

## 📚 Objectifs

- Apprendre à interroger une API via GraphQL
- Créer une interface utilisateur moderne et réactive
- Générer des graphiques SVG à partir de données réelles
- Mettre en place un système d'authentification sécurisé avec JWT
- Héberger et déployer une application frontend

## ✨ Fonctionnalités

- ✅ Page de login avec authentification (username/email + password)
- ✅ Récupération du JWT via l'endpoint Zone01
- ✅ Appel sécurisé de l'API GraphQL
- ✅ Affichage des informations utilisateur : ID, login, XP, etc.
- ✅ Affichage de statistiques sous forme de graphiques SVG
- ✅ Possibilité de se déconnecter
- ✅ Hébergement sur Netlify/Vercel/GitHub Pages

## 🧰 Technologies

- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/)
- [JWT](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/) (optionnel)
- [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)

## 🔐 Authentification

L'application utilise l'authentification **Basic Auth (Base64)** pour récupérer un token JWT depuis :

POST https://zone01normandie.org/api/auth/signin

yaml
Copier
Modifier

Le JWT est ensuite utilisé pour toutes les requêtes GraphQL via :

Authorization: Bearer <token>

markdown
Copier
Modifier

## 🔍 Requêtes GraphQL utilisées

- Requête simple : `user { id login }`
- Requête avec arguments : `object(where: { id: { _eq: ... }})`
- Requête imbriquée : `result { id user { login } }`

## 📊 Types de graphiques SVG

- 📈 XP gagné par date
- 📊 Histogramme des projets réussis / échoués
- Autres statistiques personnalisées selon l’utilisateur

## ⚙️ Installation locale

```bash
git clone https://github.com/tonpseudo/graphql-profile.git
cd graphql-profile
npm install
npm start
🚀 Déploiement
Déploiement recommandé avec :

Netlify : https://www.netlify.com/

Vercel : https://vercel.com/

GitHub Pages : avec le package gh-pages

📁 Structure du projet
pgsql
Copier
Modifier
/src
  ├── App.js
  ├── Login.js
  ├── Profile.js
  ├── Graphs.js
/public
  └── index.html
💡 Améliorations futures
Ajout de tests unitaires

Ajout de graphiques interactifs

Intégration d’un thème sombre

Ajout de plus de données (skills, audits, tentatives, etc.)

🧑‍💻 Auteur
Projet réalisé dans le cadre de Zone01 — Normandie.

Propulsé par React, GraphQL et du café ☕.

yaml
Copier
Modifier

---

Souhaites-tu aussi une **version en anglais** ? Ou que je te génère le `package.json` prêt pour déploiement GitHub Pages ou Netlify ?