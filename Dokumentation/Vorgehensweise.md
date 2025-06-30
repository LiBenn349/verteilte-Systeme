# Vorgehensweise

## 1. Zielsetzung
Ziel des Projekts ist die Erstellung eines Reiseportals, über welches man verschiedene Microservices aufgerufen werden können. Dabei sollen alle Microservices über ein gemeinsames Front aufgerufen werden können. Dabei soll es als Benutzer entweder die Rolle Admin oder User haben. Der Admin soll die Möglichkeit haben, Einträge bei den Microservices schreiben, ändern, löschen und lesen zu können, wärend der Usser nur lesen können sollte (außer bei dem Bewertungsserver, da hier der User eigene Bewertungen erstellen klönnen sollten). Für die Umsetzung haben wir uns entschieden, die Microservice.


## 2. Planung und Konzeption:
Für unserer Projekt hatten wir die Vorgabe, dieses als Microservice aufzubauen. Darauf aubauend haben wir überlegt, das wir neben den Vorgaben, das Projekt mit Node.js und Express zu machen für das Frontend Bootstrap zu benutzen. Als Datenbank haben wir MongoDB genutzt. Danach haben wir überlegt, welche Microservices wir benötigen und wie wir diese im Backend aufteilen. Wir haben insgesamt 5 Microservices (Bewertung, Hotel, Mietwagen, Flugverbindung, User), die wir alle als eigene Ordner strukturiert haben. Dazu haben wir uns Überlegt, welche Schnittstellen wir brauchen, damit wir alle Funktionen für den User, sowie Admin abgedeckt haben. Aus den Vorgaben ergeben sich hier folgende API-Endpoints:

1. Alle Elemente angezeigt bekommen
2. Nach bestimmten Elementen suchen können, anhand der eideutigen ID
3. Neue Elemente erstellen (nur Admin)
4. Elemente Updaten(nur Admin)
5. Elemente Löschen (nur Admin)

> besonderheit bei dem Bewertungs-Microservice: User hat gleiche rechte wie Admin, damit User eigene Bewertungen erstellen, ändern und Löschen kann, da sonst der sinn eines Bewertungsservices nicht gegeben ist<br/>
<br/>

## 3. Umsetzung
Für unsere Abgabe haben wir ein Git Repository erstellt, ohne die zusätzlichen Packages. Diese müssen dort eigenständig heruntergeladen werde. Dabei haben wir das hauptsächlich erstellt parallel an dem Backend Code zu arbeiten und Code-Änderungen an alle Team-Mitgleider weiterzugeben. Dadurch hatten wir alle durchgehen den aktuelsten Code. Angefangen haben wir aber damit die Ordnerstruktur zu erstellen und erste, relevante Codestücke in die richtige Dateien einzufügen. Dabei hatten wir erst überlegt, den User einzeln als Ordner in jeden Microservice einzufügen, dann hätte man sich aber immer bei jedem Microservice authentifizieren ,müssen, was die ertsellung eines gemeinsamen Frontends erschwert hätte. Dabei sind wir wie folg vorgegangen:
1. Installieren aller benötigten Software/ Extensions
   - REST-Client (VS-Code Extension)
   - MongoDB
   - Node.js
1. Ordnerstruktur erstellen mit: Models, Routes, .env-Datei und Serverdatei
2. Backend erstellen
   - Pro Microservice, ertsellen von Datenbankenschema, Middleware in der Route-Datei und Server-Datei
       1. Bewertungsservice
       2. HotelService
       3. Flugverbindungsservice
       4. Mietwagenservice
   - Erstellen der Datenbanken und einfügen der URL zur Verbindung
   - Erstellen des Users und testen, wo genau der eingefügt werden muss
   - Schreiben der authentifizierungs-Funktion und check-Admin Funktion
3. npm init -y und installieren der benötigten packages mit npm install express node-fetch jsonwebtoken dotenv cors mongoose
3. Testen der Endpoints sowie verbindungen
4. Frontend ertsellen und in Ordnerstruktur einfügen
<br/>
<br/>

## 4. Testen
Wir haben vor allem Probleme mit der Datenbank-Verbindung und derm User. Nach dem fertigstellen des Backend haben wir vor allem die Server-Dateien getestet, damit wir sehen, das die Endpoint sowie die Datenbankenanbindung funktioniert. Dafür haben wir Postman und .rest-Dateein mit GET und POST methoden angewendet. Wir haben und da einfache Testfälle ausgedacht um auch mögliche Weitere Fehler zu finden und mit einer Exeption zu handeln. Dadurch konnten wir nach und nach das Backend zum laufen brinden, damit wir das Frontend vernünfig einzubinden und die Login und Authentifizierungsmethoden zu testen. Da man für JWT und eine erfolgreiche authetifizierung einen Token benötigt, welcher vm Frontend automatisch erstellt und dann zum Backen gesendet wird. Dadurch konnten wir den User mit alleen Funktionen erst nach erstellung des Backends testen. Das Debugging und Testing haben wir auch im Team zusammen gemacht, da so mögliche Fehlerquellen schneller affallen und mehr Randfälle getestet werden können.<br/>
<br/>

## 5. Herausforderungen
Bei der Erstellung des Projekts sind wir im Laufe der Bearbeitung auf verschiedene Probleme getroffen. Anfangs hatten wir vor allem Probleme damit im Backend die Datenbankverbindung zu bekommen und die Server zu starten. Da wiroft einen Fehler in der Router-Datei hatten und teile der Middleware falsch waren. Zum Ende des Projekts hatten wir viele Probleme mit dem User und der Authentifizierung, sowie mit der zusammenarbeit mit dem Frontend, da hier manche Endpoints nicht funktioniert haben. Wir hatten zeitweise das Problem, dass die Unterschiedlice Weiterleitung zu Admin-Frontend und User-Frontend nicht funktiont hat und man immer nur zum Admin gekommen ist.<br/>
<br/>

## 6. Fazit
Das Projekt kann noch erweitet werden. Neben weiteren Microservices, kann mann das suchsystem auch zu einem Buchungssystem erweitern. Momentan ist es auch noch möglich, sich einfach als Admin einzuloggen. Dafür müssen wir auch noch eine andere zuteilungsmethode bei der Regestrierung finden. Generell läst sich das Projekt sehr einfach erweitern, das dies hier ein Microservice-Projekt ist, das nur über das geneisame frntend und den User verbunden ist.
