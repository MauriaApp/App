# Mauria (Client mobile)
Code de l'application mobile Mauria

## Technologies utilisées

- Ionic (React) `v6.5.0`
- Sass Modules
- Capacitor `v4.6.1`
- TypeScript `v4.9.4`

## Structure du projet

Nous avons séparé le répertoire en plusieurs dossiers :
- `resources` : contient le logo de l'application
- `public ` : contient la version du build actuelle
- `src` : contient le code de l'application

Au sein de `src` se trouve un projet React "standard" :
- `assets` : contient les SVGs utilisés
- `components` : contient les composants réutilisables dans l'application
- `contexts` : contient la structure des `modals` utilisés
- `pages` : contient les différentes pages de l'application
- `theme` : contient le CSS, ici du SCSS
- `types ` : contient les différents types de structure utilisés suivant les pages
- `utils` : contient les différents fichiers "utile" au bon fonctionnement de l'application, comme les fonctions d'appel aux `api`, aux retours haptiques...


## Installation

### Prérequis

- NodeJS `v18+`
- npm *et/ou* yarn
- TypeScript `v4+`

### Installation

1. Cloner le repo
2. Se placer dans le dossier du projet : `cd app`
3. Installer les dépendances : `npm i`

## Lancement

### Dans un navigateur
1. Lancer le projet : `npm start`
2. Le projet est accessible à l'adresse suivante : `http://localhost:3000`

### Sur iOS/iPadOS (nécessite un Mac et un compte développeur Apple)
1. Ouvrir le projet dabs XCode : `ionic capacitor open ios`
2. Signer le projet avec votre compte développeur Apple *(dans Signing & Capabilities)*
3. *(Optionnel)* Changer le bundle ID (**A FAIRE SI ERREUR DE BUNDLE ID**)
4. Lancer le projet sur un simulateur ou un appareil connecté avec `ionic capacitor run ios -l --external`\
   *(`-l` permet de lancer le projet en mode live-reload et `--external` de lancer le projet sur un appareil connecté en USB)*
5. Choisir l'appareil sur lequel lancer l'application
6. L'application se lance sur l'appareil (il se peut que vous deviez accepter le certificat de l'application dans les paramètres de l'appareil)

### Sur Android
```Demander à Milo de compléter...```

## Roadmap
Important
- Actualisation automatique des données (le [plugin](https://github.com/ionic-team/capacitor-background-runner) étant très récent, il présente de nombreux soucis actuellement...)
--- 
Secondaire
- Ajouter un modal au lancement, si update pour expliquer les nouveautés de la dernière mise à jour
- Ajouter un message si une mise à jour est disponible (il faut stocker la version de l'application dans le `localStorage` et un appel à l'`api` permet de savoir si une mise à jour est disponible)
- Implémenter des tests unitaires et d'intégration

## Contribution

Pour contribuer au projet, il faut faire un fork du repo à partir de la branche `pre-release`.
Une fois votre fork créé, vous pouvez travailler sur votre fork
Pour proposer vos changements, vous devez faire une pull request sur la branche `pre-release` du repo principal.

Si votre contribution est acceptée, elle sera déployée dans la prochaine mise à jour de l'application ! (Nous essayons de limiter le nombre de mise à jour de l'application)

## License
Ce projet est sous licence GNU v3. Pour plus d'informations, voir le fichier `LICENSE` à la racine du projet.
