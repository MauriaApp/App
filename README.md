# Mauria (application)
Code de l'application mobile Mauria

## Technologies utilisées

- Ionic (React) `v6.5.0`
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
4. Lancer le projet : `npm start`
5. Le projet est accessible à l'adresse suivante : `http://localhost:3000`


## Roadmap
- Passage sous Ionic `v5+`
- Suppression d'un événement ajouté au calendrier (=> création d'un modal lors du clique sur un cours)
- Actualisation automatique des données (le [plugin](https://github.com/ionic-team/capacitor-background-runner) étant très récent, il présente de nombreux soucis actuellement...)
- Un "agenda" permettant de noter des notes et/ou travaux à effectuer
- Ajouter un feed d'événements Junia sur la page principal (cela pour but de partager et découvrir les prochains évenements Junia sans passer par tous les réseaux sociaux )
- Faire une version optimisée pour les iPads
- Ajouter un pop-up pour expliquer les nouveautés de la dernière mise à jour
- Implémenter des tests unitaires

## Contribution

Pour contribuer au projet, il faut faire un fork du repo à partir de la branche `master`.
Une fois votre fork créé, vous pouvez travailler sur votre fork
Pour proposer vos changements, vous devez faire une pull request sur la branche `master` du repo principal.

Si votre contribution est acceptée, elle sera déployée dans la prochaine mise à jour de l'application ! (Nous essayons de limiter le nombre de mise à jour de l'application)

## License
Ce projet est sous licence GNU v3. Pour plus d'informations, voir le fichier `LICENSE` à la racine du projet.
