# mein-Urlaub

## Benötigte Installationen für fehlerlose Ausführung des Codes

## Software:
- MongoDB
- Node.js


### Terminalbefehle in VS Code: --> muss in jedem Microservice gemacht werden

 1. gucke ob du im richtigen Ordner bist. Immer da wo auch die Server-Datei liegt, müssen auch die Befehle ausgeführt werden --> cd Ordnername
 2. npm init -y
 3. npm install cors jsonwebtoken express mongoose node-fetch dotenv
 4. npm install -g nodemon
 5. nodemon DateinameServer.js

Schritte 1. bis 3. müssen in jedem Microservice Ordner wiederholt werden, damit in jedem Ordner auch die package.json Dateien und so sind
Schritt 5. muss auch in jedem Microserver gemacht werden, denn er startet den Server

--------------------------------------------------------------------------------------------------------------------------------------------------------





Ordnerstruktur der Abgabe <br>

mein-urlaub/ <br>
├── bewertung-service/ <br>
|&nbsp;&nbsp;&nbsp;├── models/ <br>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── bewertung.js <br>
│&nbsp;&nbsp;&nbsp;├── routes/ <br>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── bewertungen.js <br>
│&nbsp;&nbsp;&nbsp;├── app.js <br>
│&nbsp;&nbsp;&nbsp;├── server.js <br>
│&nbsp;&nbsp;&nbsp;├── package.json <br>
│&nbsp;&nbsp;&nbsp;└── tests/ <br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── bewertungen.rest <br>
├── hotel-service/ <br>
│&nbsp;&nbsp;&nbsp;├── models/ <br>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── hotel.js <br>
│&nbsp;&nbsp;&nbsp;├── routes/ <br>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── hotels.js <br>
│&nbsp;&nbsp;&nbsp;├── app.js <br>
│&nbsp;&nbsp;&nbsp;├── server.js <br>
│&nbsp;&nbsp;&nbsp;├── package.json <br>
│&nbsp;&nbsp;&nbsp;└── tests/ <br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── hotels.rest <br>
├── flugverbindung-service/ <br>
│&nbsp;&nbsp;&nbsp;├── models/ <br>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── flugverbindung.js <br>
│&nbsp;&nbsp;&nbsp;├── routes/ <br>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── flugverbindungen.js <br>
│&nbsp;&nbsp;&nbsp;├── app.js <br>
│&nbsp;&nbsp;&nbsp;├── server.js <br>
│&nbsp;&nbsp;&nbsp;├── package.json <br>
│&nbsp;&nbsp;&nbsp;└── tests/ <br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── flugverbindungen.rest <br>
└── mietwagen-service/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;├── models/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── mietwagen.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;├── routes/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── mietwagen.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;├── app.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;├── server.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;├── package.json <br>
&nbsp;&nbsp;&nbsp;&nbsp;└── tests/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── mietwagen.rest
