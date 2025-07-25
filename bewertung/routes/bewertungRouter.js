
// Diese Datei enthält alle Endpunkte (Routen) für den Bewertungs-Microservice

// -----------------------------
// Benötigte Module einbinden
// -----------------------------
const express = require('express'); //Laden der Libraries 
const bewertungsModel = require('../models/bewertungModel');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const router = express.Router(); //Router-Objekt von Express erstellen anstatt einer normalen APP-Instanz

//router JSON Fähig machen
router.use(express.json());

// --------------------------------------------------
// Middleware: prüft, ob ein gültiger JWT-Token vorhanden ist
// --------------------------------------------------
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token fehlt' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = { userID: decoded.userID, rolle: decoded.rolle };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token ungültig' });
    }
}

// --------------------------------------------------
// Middleware: Nur Admins dürfen bestimmte Aktionen ausführen
// --------------------------------------------------
function checkAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Nur Admins dürfen diese Aktion durchführen' });
  }
  next();
}

// --------------------------------------------------
// Middleware: Holt eine Bewertung anhand ihrer ID aus der Datenbank
// --------------------------------------------------
async function getRatingByID(req, res, next){
    let bewertung; //leere Bewertung schaffen
    try{
        //das eine Bewertung mit der entsprechenden ID finden --> die ID steht in der URL unter dem Parameter ID
        bewertung = await bewertungsModel.findById(req.params.id);
        
        //Falls keine Bewertung mit der ID gefunden werden kann, soll die Abfrage hier enden und die Response zum Client geschickt
        if(bewertung == null){
            return res.status(404).json({message: "Bewertung mit der ID " + req.params.id + " konnte nicht gefunden werden"});
        }//Falls alles passt geht es nach dem Catch weiter

    }catch(err){
        res.status(500).json({message: err.message});
    }

    //Hier geht es weiter
    res.bewertung = bewertung;
    next();
}

// --------------------------------------------------
// REST-API ENDPOINTS
// --------------------------------------------------

// 1. Alle Bewertungen lesen
router.get('/', async (req, res) => {
    try{

        //Alle Bewertungen vom Model finden
        const bewertungen = await bewertungsModel.find();  //Wir warten ab bis die Datenbank uns alle Bewertungen ausgibt
        res.status(200).json(bewertungen);  //senden die Bewertungen ans Frotend

    }catch(err){
        res.status(500).json({message: err.message});  //geben wir im Fehlerfall einen 500-Serverfehler aus, wenn keine Bewertungen gefunden werden
    }
})

// 2. Ein bestimmtes Rating anhand seiner (ID) finden
router.get("/:id", authMiddleware, getRatingByID, (req,res) => {
    res.status(200).json(res.bewertung); //aus der MiddleWare Funktion getRatingByID wurde in res.bewertung bereits das eine bestimmtes Bewertung "reingeschrieben"
})

//  2a Ein bestimmtes Bewertung anhand einer bestimmten ServiceID finden
router.get('/ofService/:ID', async (req, res) => {
    //Hier soll anhand der übergebenen ServiceID nur die Bewertungen gezogen werden, die dieser ServiceID entsprechen
    try{
        const bewertung = await bewertungsModel.find({ID: req.params.ID});
        if(bewertung){//nur wenn es Bewertungen gibt, sollen sie zurückgegeben werden
            res.status(200).json(bewertungen);
        }else{
            res.status(404).json({message: "Keine Bewertungen für diesen Service gefunden"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//    3. Ein bestimmtes Rating schreiben 
router.post('/', authMiddleware, async(req, res) => {
    try{

        //Erstellen eines neuen Ratings
        const bewertung = new bewertungsModel({
            //Das was im Model als Attribute definiert ist, muss hier befüllt werden sofern diese Required sind
            serviceTyp: req.body.serviceTyp, //Welcher Service wird bewertet?
            serviceID: req.body.serviceID, //ID des bewerteten Objekts
            nutzerName: req.body.nutzerName, //Name des Nutzers, der die Bewertung abgibt
            wert: req.body.wert, //Bewertung zwischen 1 und 5
            kommentar: req.body.kommentar, //Kommentar des Nutzers zur Bewertung, optional
            erstelltAm: req.body.erstelltAm //Datum, an dem die Bewertung erstellt wurde
        })

        const newBewertung = await bewertung.save();//Die Datenbank schreibt das neue Rating, sofern es erfolgreich angelegt wurde, erhalten wir das Product inkl. ID und Version von der Datenbank zurück

        res.status(201).json(newBewertung);//neues Rating an Client zurückschicken

    }catch(error){
        res.status(500).json({message: error.message});
    }
})


//    4. Ein bestimmtes Rating updaten (ID)
router.put('/:id', authMiddleware, getRatingByID, async(req, res) => {
    try{
        //Das Product mit der übergebenen ID steht in res.product durch die Middleware Funktion bereit
        //Wir updaten es mit den Werten aus dem Request
        if(req.body.serviceTyp){
            res.bewertung.serviceTyp = req.body.serviceTyp;
        }
        if(req.body.serviceID){
            res.bewertung.serviceID = req.body.serviceID;
        }
        if(req.body.nutzerName){
            res.bewertung.nutzerName = req.body.nutzerName;
        }
        if(req.body.wert){
            res.bewertung.wert = req.body.wert;
        }
        if(req.body.kommentar){
            res.bewertung.kommentar = req.body.kommentar;
        }
        if(req.body.erstelltAm){
            res.bewertung.erstelltAm = req.body.erstelltAm;
        }

        if(!req.body.serviceID && !req.body.wert && !req.body.kommentar && !req.body.serviceTyp && !req.body.nutzerName && !req.body.erstelltAm){
            res.status(400).json({message: 'Fehlerhafte Anfrage zum Updaten des Ratings'});
        }
       
        //Wir schreiben dann die Veränderungen in die Datenbank
        const updatedBewertung = await res.bewertung.save();//als Ergebnis von save erhalten wir hier das geupdatete Produkt aus der DB zurück

        res.status(201).json(updatedBewertung);

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

// 5. Löschen eines Eintrags aus der Datenbank
router.delete('/:id', authMiddleware, getRatingByID, async(req, res) => {
    try{
        const deletedBewertung = await bewertungsModel.deleteOne(res.bewertung) //unser Product aus der MiddleWare Funktion soll gelöscht werden
        res.status(200).json({deletedBewertung});
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

// --------------------------------------------------
// Export des Routers für die Verwendung in der Server-Datei
// --------------------------------------------------
module.exports = router;
