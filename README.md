# Jet3Holiday

## Benötigte Installationen für fehlerlose Ausführung des Codes

### Software:
- MongoDB
- Node.js

### Terminalbefehle in VS Code:
 1. gucke ob du im richtigen Ordner bist. Immer da wo auch die Server-Datei liegt, müssen auch die Befehle ausgeführt werden --> cd Ordnername
 2. npm init -y
 3. npm install cors jsonwebtoken express mongoose node-fetch dotenv
 4. npm install -g nodemon
 5. nodemon DateinameServer.js

Schritte 1. bis 3. müssen in jedem Microservice Ordner wiederholt werden, damit in jedem Ordner auch die package.json Dateien und so sind
Schritt 5. muss auch in jedem Microserver gemacht werden, denn er startet den Server

--------------------------------------------------------------------------------------------------------------------------------------------------------





```text
.
├── Dokumentation
│   ├── Architektur.md
│   ├── Benutzer.md
│   ├── Hosting.md
│   └── Vorgehensweise.md
├── bewertung
│   ├── frontend
│   │   └── bewertung.html
│   ├── models
│   │   └── bewertungModel.js
│   ├── routes
│   │   └── bewertungRouter.js
│   ├── .env
│   └── bewertungsServer.js
├── flugverbindung
│   ├── frontend
│   │   └── flugverbindung.html
│   ├── models
│   │   └── flugModel.js
│   ├── routes
│   │   └── flugRouter.js
│   ├── .env
│   └── flugverbindungsServer.js
├── hotel
│   ├── frontend
│   │   └── hotel.html
│   ├── models
│   │   └── hotelModel.js
│   ├── routes
│   │   └── hotelRouter.js
│   ├── .env
│   └── hotelServer.js
├── mietwagen
│   ├── frontend
│   │   └── mietwagen.html
│   ├── models
│   │   └── mietwagenModel.js
│   ├── routes
│   │   └── mietwagenRouter.js
│   ├── .env
│   └── mietwagenServer.js
├── user
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   └── userRouter.js
│   ├── .env
│   └── userServer.js
├── README.md
└── startseite.html

```
Projekt von: sim.krieger.23@heilbronn.dhbw.de, mel.frost.23@heilbronn.dhbw.de, lis.benning.23@heilbronn.dhbw.de

