# mein-Urlaub

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
mein-urlaub/
├── bewertung-service/
│   ├── models/
│   │   └── bewertung.js
│   ├── routes/
│   │   └── bewertungen.js
│   ├── app.js  
│   ├── server.js  
│   ├── package.json  
│   └── tests/
│       └── bewertungen.rest
├── hotel-service/
│   ├── models/
│   │   └── hotel.js
│   ├── routes/
│   │   └── hotels.js
│   ├── app.js  
│   ├── server.js  
│   ├── package.json  
│   └── tests/
│       └── hotels.rest
├── flugverbindung-service/
│   ├── models/
│   │   └── flugverbindung.js
│   ├── routes/
│   │   └── flugverbindungen.js
│   ├── app.js  
│   ├── server.js  
│   ├── package.json  
│   └── tests/
│       └── flugverbindungen.rest
└── mietwagen-service/
    ├── models/
    │   └── mietwagen.js
    ├── routes/
    │   └── mietwagen.js
    ├── app.js  
    ├── server.js  
    ├── package.json  
    └── tests/
        └── mietwagen.rest
