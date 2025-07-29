# AI4CKD

AI4CKD est une plateforme innovante qui utilise l'intelligence artificielle pour révolutionner le suivi néphrologique. Elle vise à améliorer la détection précoce, le suivi et la gestion des maladies rénales chroniques (MRC) grâce à des outils avancés de gestion des patients, d'analyse des données médicales et de visualisation.

---

## Fonctionnalités principales

- Gestion complète des patients : création, modification, consultation et suppression des dossiers patients.
- Historique médical détaillé pour chaque patient, incluant les consultations, observations et prescriptions.
- Tableau de bord analytique avec statistiques clés, graphiques et tendances sur les patients et leurs diagnostics.
- Interface utilisateur protégée par authentification pour garantir la confidentialité des données.
- Utilisation de l'intelligence artificielle pour améliorer le suivi et la prise de décision clinique.

---

## Technologies utilisées

- **Next.js** : Framework React pour le rendu côté serveur et la génération de sites statiques.
- **Prisma** : ORM pour la gestion de la base de données SQLite.
- **SQLite** : Base de données légère embarquée.
- **React** : Bibliothèque pour la construction d'interfaces utilisateur.
- **Tailwind CSS** : Framework CSS utilitaire pour un design rapide et responsive.
- **Framer Motion** : Bibliothèque d'animations pour React.

---

## Installation et configuration

1. Cloner le dépôt :

```bash
git clone <url-du-depot>
cd Hackathon_GL_2025-main
```

2. Installer les dépendances :

```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement :

Créer un fichier `.env` à la racine du projet avec la variable suivante :

```
DATABASE_URL="file:./dev.db"
```

4. Initialiser la base de données et appliquer les migrations :

```bash
npx prisma migrate dev
```

5. (Optionnel) Peupler la base de données avec des données de test :

```bash
npx ts-node prisma/seed.ts
```

---

## Lancement du serveur de développement

Pour démarrer le serveur en mode développement, exécutez :

```bash
npm run dev
# ou
yarn dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## API

L'application expose plusieurs endpoints API RESTful, notamment :

- `GET /api/patients/[id]` : Récupérer les informations d'un patient par son ID.
- `PUT /api/patients/[id]` : Mettre à jour les informations d'un patient.
- `DELETE /api/patients/[id]` : Supprimer un patient.
- `GET /api/stats` : Récupérer les statistiques pour le tableau de bord (filtrage par plage de dates possible).

---

## Documentation et ressources

- [Documentation Next.js](https://nextjs.org/docs) - pour en savoir plus sur Next.js.
- [Tutoriel Next.js](https://nextjs.org/learn) - tutoriel interactif.
- [Déploiement sur Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) - déploiement facile de l'application.

---

## Licence

Ce projet est sous licence MIT.

---

© AI4CKD - Tous droits réservés. Dispositif médical CE certifié.
