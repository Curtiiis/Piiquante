# Formation Dev Web - Projet 5 - Piiquante

## Piiquante : Marque de sauces piquantes
<p align="center">
  <img src="./logo_piiquante.png" />
</p>

### Scénario

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .


### Mission
Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.
Merci de faire particulièrement attention aux exigences en matière de sécurité. Nous avons récemment été victimes d'attaques sur notre site web et nous voulons être sûrs que l'API de cette application est construite selon des pratiques de code sécurisées. Tous les mots de passe des utilisateurs recueillis par l'application doivent être protégés !

Vous êtes prêt à vous lancer dans l'API ! C’est parti !

## Installation du projet
1. Cloner le repository
2. Installer Node.js
3. Installer Angular CLI
4. Installer Nodemon
5. Installer les dépendences pour les dossiers frontend et backend
6. Mettre en place le fichier .env à la racine

````text
# MongoDB credentials
MONGODB_URI = mongodb+srv://USER:PSW@HOST/ <dbname >?retryWrites=true & w=majority

# Random secret token
JWT_SECRET_TOKEN = xxx

# Session code
SECRET_SESSION = xxx
````

7. Lancer le server frontend avec 'npm run start'
8. Lancer le server backend avec 'npm run start'

### Compétences développées et stack utilisée

    💹 Implémenter un modèle logique de données conformément à la réglementation
    💹 Mettre en œuvre des opérations CRUD de manière sécurisée
    💹 Stocker des données de manière sécurisée
