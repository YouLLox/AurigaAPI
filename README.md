# AurigaAPI Documentation

Le projet `AurigaAPI` est un outil JavaScript permettant de synchroniser et d'exploiter les données académiques provenant de l'API Auriga (EPITA).

Ce module est conçu pour :

1.  **Récupérer** automatiquement les données depuis l'API Auriga (Notes, Syllabus, Infos étudiant).
2.  **Synchroniser** et formater ces données dans des fichiers JSON locaux.
3.  **Fournir** une classe `AurigaAPI` avec des méthodes simples pour lire ces données.

## Prérequis

- **Node.js** installé.
- Un **Token d'API** Auriga valide (Bearer token).

## Installation

1.  Clonez le projet.
2.  Installez les dépendances :
    ```bash
    npm install
    ```

## Utilisation

### Initialisation

Instanciez simplement la classe sans paramètre.

```javascript
const aurigaAPI = new AurigaAPI();
```

### Synchronisation des Données

Pour lancer la récupération des données, appelez la méthode `create` en passant votre token en paramètre.

```javascript
const myToken = "VOTRE_TOKEN_BEARER_ICI";
await aurigaAPI.create(myToken);
```

Une fois le token fourni une première fois via `create`, il est mémorisé par l'instance pour les appels futurs (si vous en faites).

_Note : Cette méthode télécharge les données dans `dataExtract/` puis génère les fichiers propres dans `dataSync/`._

### Lecture des Données

Une fois les données synchronisées, vous pouvez utiliser les méthodes suivantes pour accéder aux informations stockées localement.

**🏫 Notes (Grades)**

- `aurigaAPI.getAllGrades` : Retourne toutes les notes.
- `aurigaAPI.getGradeByCode(code)`
- `aurigaAPI.getGradeByName(name)`
- `aurigaAPI.getGradeByType(type)`

**📅 Syllabus (Emploi du temps)**

- `aurigaAPI.getAllSyllabus` : Retourne tout le syllabus.
- `aurigaAPI.getSyllabusByCode(code)`
- `aurigaAPI.getSyllabusByUE(ue)`
- `aurigaAPI.getSyllabusByStartDate(date)`

**👤 Données Utilisateur**
L'API donne accès à des objets complets pour l'étudiant et ses proches.

- `aurigaAPI.getStudentData` : Informations personnelles (Nom, Prénom, Emails, etc.).
- `aurigaAPI.getHighSchoolData` : Informations sur le baccalauréat.
- `aurigaAPI.getStudentParent1` : Infos du premier responsable légal.
- `aurigaAPI.getStudentParent2` : Infos du second responsable légal.
- `aurigaAPI.getStudentFinancialGuarantor` : Infos du garant financier.

## Structure des Dossiers

- `dataExtract/` : Contient les réponses brutes de l'API Auriga.
- `dataSync/` : Contient les fichiers JSON formatés et simplifiés, prêts à être utilisés par votre application.
- `payloads/` : Contient les configurations de recherche pour l'API.
