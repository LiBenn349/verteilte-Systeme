//Installierte Libraries express dotenv cors mongoose node-fetch

//Initialisierung Express
const express = require('express');
const app = express();

//Initialisierung Dotenv
require('dotenv').config();

//Initialisierung Mongoose
const mongoose = require('mongoose');

//Abfrage der DotEnv Konstanten
const port = process.env.PORT;
const dburl = process.env.DBURL;

//Initialisierung CORS
const cors = require('cors');

//Express soll JSON verwenden
app.use(express.json());

//Server soll Cross Site Scripting Kompatibel sein
app.use(cors());

//Datenbankverbindung aufbauen
mongoose.connect(dburl); //Baut Verbindung zur DB auf, die letztlich in der .env Datei hinterlegt ist
const db = mongoose.connection; //Connection in der DB Konstante verfügbar machen
db.on('error', (error) => console.error(error));//Falls ein Fehler bei der Verbindung auftritt, soll der Fehler in der Server console ausgegeben werden
db.once('open',() => console.log("Server hat Verbindung zur DB " + dburl + " erfolgreich hergestellt")); //Öffnen der DB Verbindung und Ausgabe der Meldung, dass die Verbindung hergestellt wurde wenn alles erfolgreich ist


const hotelRouter = require('./routes/hotelRouter');//Router laden
app.use('/', hotelRouter);//Router unter dem vorne angegebenen Pfad verfügbar machen

//Server starten
app.listen(port, () => {
    console.log("MicroService Hotel wurde erfolgreich auf Port: " + port + " gestartet");
})