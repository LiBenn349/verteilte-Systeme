# Hosting-Vorschlag für das Projekt „jet2holiday“

## Ziel

Das Ziel ist es, die vier Microservices (`bewertung-service`, `hotel-service`, `flugverbindung-service`, `mietwagen-service`) effizient, sicher und skalierbar bereitzustellen.

---

## 1. Hosting-Strategie: Docker + Render (einfach & kostenlos für kleine Projekte)

### Vorteile:
- Kein eigener Server notwendig
- Einfaches Setup mit Docker
- Unterstützt mehrere Services
- Gutes Free-Tier

### Benötigte Tools:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Render](https://render.com/) (alternativ: Railway, Fly.io)

---

## 2. Schritt-für-Schritt Anleitung

### 🔹 Schritt 1: Dockerfile für jeden Service anlegen

Beispiel: `bewertung-service/Dockerfile`
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
