# User

Der User enthält alle Komponenten des User-Microservices und ist zuständig für die **Benutzerauthentifizierung** und das **Token-Management** mittels JWT.
</br>

## Inhalte des Ordners

### `server.js`
- Startpunkt des User-Microservices.
- Initialisiert Express, CORS, Mongoose (für MongoDB) und Umgebungsvariablen.
- Bindet den `userRouter` ein.
- Startet den Server auf dem definierten Port.
</br>

### `routes/userRouter.js`
- Enthält die API-Endpunkte `/login` und `/geheimnis`.
- `/login`: Authentifiziert Benutzer (aktuell über ein statisches Array) und gibt ein JWT zurück.
- `/geheimnis`: Geschützte Route, nur mit gültigem JWT zugänglich.
- Nutzt Middleware zur Token-Verifizierung (`auth`).
</br>

### `models/userModel.js`
- Definiert ein Mongoose-Schema für Benutzer:
  - Felder: `username`, `password`, `role`, `id`.
  - Rollen: `admin` oder `user`.
- Bereit für eine spätere Nutzung echter Benutzerdaten aus der MongoDB (aktuell ungenutzt).
</br>

### '.env'
- port: Port, auf dem der Microservice läuft.
- secret: Secret zur Signierung von JWTs.
- dburl: MongoDB-URL für die User-Datenbank.


---

> Der `User`-Ordner bildet die Grundlage für Login-Authentifizierung und geschützte Bereiche des Systems. Die JWT-Logik erlaubt es, andere Microservices durch Token-basierte Sicherheit zu schützen.
