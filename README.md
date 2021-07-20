
![photo](/Accueil.png)

# -------------------- Manuel d'utilisation --------------------

Renommer **/config/.env.example** en **.env** et veuillez remplir les variables d'environnement PortBackend , adress FrontEnd , codeToken , nom DB

exemple

	* PORT = 5000
	* CLIENT_URL = http://localhost:3000
	* TOKEN_SECRET= devinePas
	* DB_NAME = voiture

Renommer **/client/.env.example** en **.env** et veuillez remplir la variable d'environnement REACT_APP_API_URL par adresse du back-end

exemple

	* REACT_APP_API_URL = http://localhost:5000

Lancer  mongodb : **sudo service mongod start** ou **sudo systemctl start mongod**

Lancer **npm install** ou **yarn** dans le dossier  **/** puis dans **/client**

Lancer **npm start** ou **yarn start** dans le dossier  **/** puis dans **/client**

# -- Liste des fonctionnalité de l’Application de voiture --

Utilisateur non  connecté :

	* Voir liste des  voitures(Accueil)
	* Voir  description d’une voiture donnée
	* S’inscrire
	* Se  connecter
	* Voir le profil d'un  utilisateur membre

Utilisateur connecté :

	* Voir liste des voitures(Accueil)
	* Voir description d’une voiture donnée
	* Se connecter
	* Publier une voiture
	* Commenter  une voiture
	* Voir et modifier le profil
	* Voir le profil d'un autre utilisateur

# -------------------- Prise en main --------------------

Vu  que  l'application est dynamique, l'utilisateur doit  en premier s'inscrire, se connecter, puis publier des voitures avant de  pouvoir visualiser la liste des voitures.


# --------------------  Perspective futur --------------------

Espace administration

	1. Se connecter en tant qu'administrateur
	2. Gérer les  utilisateurs :  ajouter, modifier, supprimer, accepter ou refuser les demandes  									   d'inscription
	3 .Gérer les publications  :  ajouter,  modifier, supprimer, valider ou  refuser les publications

Option de  recherche

	1. Rechercher des voitures par catégorie : date,  type, modèle...
	2. Rechercher des utilisateurs

Action sur la publication

	1. Donner une mention j'aime aux  publications
	2. Donner une   mention j'aime aux commentaires
	3. Répondre aux commentaires
	4. Supprimer une commentaire
	5. Modifier une commentaire
