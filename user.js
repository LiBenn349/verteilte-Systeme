//Installierte Libraries express dotenv cors mongoose node-fetch jsonwebtoken
const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();

const port = process.env.PORT;
const secret = process.env.SECRET;
const dburl = process.env.DBURL;

//Initialisierung Mongoose
const mongoose = require('mongoose');

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


//Berechtigte User
const users = [
    {
        username: "test",
        password: "test2"
    },{
        username: "zweiterUser",
        password: "hallo" 
    }
]

const router = require('./routes/userRouter');
app.use('/', router);

app.listen(port, () => {
    console.log("Server gestartet auf Port: " + port);
})