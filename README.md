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

Instanciez la classe avec votre token d'API.

```javascript
const myToken = "VOTRE_TOKEN_BEARER_ICI";
const aurigaAPI = new AurigaAPI(myToken);
```

### Synchronisation des Données

Pour lancer la récupération et la synchronisation des données, appelez simplement la méthode `create`.

```javascript
await aurigaAPI.create();
```

_Note : Cette méthode télécharge les données temporairement dans `dataExtract/`, génère les fichiers formattés dans `dataSync/`, puis supprime le dossier `dataExtract/`._
_En cas d'erreur (affichée en anglais dans la console), le dossier temporaire est également nettoyé._

### Lecture des Données

Une fois les données synchronisées, vous pouvez utiliser les méthodes suivantes pour accéder aux informations stockées localement.

**🏫 Notes (Grades)**

- `aurigaAPI.getAllGrades` : Retourne toutes les notes.
- `aurigaAPI.getGradeByCode(code)`
- `aurigaAPI.getGradeByName(name)`
- `aurigaAPI.getGradeByType(type)`

**📅 Syllabus (Programme)**

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

- `dataExtract/` : Dossier temporaire contenant les réponses brutes de l'API Auriga (supprimé après synchronisation).
- `dataSync/` : Contient les fichiers JSON formatés et simplifiés, prêts à être utilisés par votre application.
- `payloads/` : Contient les configurations de recherche pour l'API.
