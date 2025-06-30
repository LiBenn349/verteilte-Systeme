# Architektur-Dokumentation

## 1. Systemübersicht

Die Anwendung „**mein-urlaub**“ besteht aus vier Microservices, die gemeinsam eine Plattform zur Urlaubsplanung bilden. Jeder Service ist zuständig für eine eigene Domäne:

- **Bewertungs-Service**: Verwaltung von Bewertungen durch Nutzer.
- **Hotel-Service**: Bereitstellung von Hotelinformationen.
- **Flugverbindung-Service**: Verwaltung von Flugverbindungen.
- **Mietwagen-Service**: Verwaltung von Mietwagenangeboten.

Jeder Service läuft unabhängig, stellt REST-APIs bereit und kann einzeln skaliert oder getestet werden.

## 2. Erklärung einzelner Services

### Bewertung-Service
- Verwaltet Nutzerbewertungen.
- Enthält Modelle und Routen zur Erstellung, Abfrage und Verwaltung von Bewertungen.

### Hotel-Service
- Liefert Hoteldaten.
- Unterstützt das Anlegen und Abrufen von Hotelinformationen über HTTP-Endpunkte.

### Flugverbindung-Service
- Speichert und liefert Flugverbindungsdaten.
- REST-Routen zur Flugsuche oder zum Erstellen neuer Flüge.

### Mietwagen-Service
- Stellt Mietwagenoptionen bereit.
- Verwaltet Daten zu verfügbaren Mietwagen.

## 3. Schnittstellenbeschreibung

Alle Services verwenden REST-APIs mit JSON als Austauschformat. Die Endpunkte sind nach dem Schema aufgebaut:

| Service                | Methode | Pfad                           | Beschreibung                         |
|------------------------|--------|----------------------------------|--------------------------------------|
| Bewertung-Service      | GET    | `/bewertungen`                  | Alle Bewertungen abrufen             |
|                        | POST   | `/bewertungen`                  | Neue Bewertung erstellen             |
| Hotel-Service          | GET    | `/hotels`                       | Alle Hotels abrufen                  |
|                        | POST   | `/hotels`                       | Neues Hotel anlegen                  |
| Flugverbindung-Service | GET    | `/flugverbindungen`            | Alle Flüge abrufen                   |
|                        | POST   | `/flugverbindungen`            | Neue Flugverbindung anlegen         |
| Mietwagen-Service      | GET    | `/mietwagen`                   | Mietwagenangebote abrufen           |
|                        | POST   | `/mietwagen`                   | Mietwagenangebot erstellen          |

## 4. Ordnerstruktur

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
        
```

## 5. Ablaufbeschreibung und Datenfluss

1. Der Client sendet Anfragen über HTTP an die jeweiligen Services.
2.Der Service verarbeitet die Anfrage (Validierung, Datenbankzugriff).

3. Die Antwort wird in JSON-Format zurückgegeben.

4. Die Tests simulieren typische REST-Aufrufe und validieren die Antworten.


Beispiel (für eine Bewertung):
```
Client → POST /bewertungen → bewertung-service verarbeitet und speichert → Antwort mit Status 201
```

## 6. Entwurfsentscheidung

- Microservice-Architektur: Ermöglicht eine klare Trennung der Verantwortlichkeiten. Jeder Service kann unabhängig entwickelt, getestet und deployed werden.
Node.js + Express: Schlanke, performante und weit verbreitete Lösung für RESTful APIs.
- REST-API: Verständlich und leicht konsumierbar für Clients.
- Tests mit .rest-Dateien: Schnelle Überprüfung der Schnittstellen mit REST-Clients wie VSCode Thunder Client.
- Modulare Struktur: Klare Trennung in routes, models, und zentrale Startdateien (server.js, app.js)

