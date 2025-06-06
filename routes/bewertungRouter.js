//ALLE ENDPOINTS ZUM PRODUKT LANDEN IN DIESER DATEI 
const express = require('express'); //Laden der Libraries 
const bewertungsModel = require('../models/bewertungModel');
const { authenticateToken, requireAdmin } = require('../authUser/userMiddelware');


//ACHTUNG --> hier keine "normale Express Initialisierung"
const router = express.Router();

//router JSON Fähig machen
router.use(express.json());

/*5 Endpoints erstellen
    1. Alle Bewertungen lesen
    2. Eine bestimmte Bewertung anhand ihrer (ID) finden
    3. Eine bestimmte Bewertung schreiben
    4. Eine bestimmte Bewertung updaten (ID)
    5. Eine bestimmte Bewertung löschen (ID)
*/


//    1. Alle Bewertungen lesen
router.get('/',authenticateToken, async (req, res) => {
    try{

        //Alle Bewertungen vom Model finden
        const bewertungen = await bewertungsModel.find();//Wir warten ab bis die Datenbank uns alle Bewertungen ausgibt
        res.status(200).json(bewertungen);//senden die Bewertungen ans Frotend

    }catch(err){
        res.status(500).json({message: err.message});//geben wir im Fehlerfall einen 500-Serverfehler aus 
    }
})


//    2. Ein bestimmtes Rating anhand seiner (ID) finden
router.get("/:id", authenticateToken, getRatingByID, (req,res) => {
    res.status(200).json(res.bewertung); //aus der MiddleWare Funktion getRatingByID wurde in res.bewertung bereits das eine bestimmtes Bewertung "reingeschrieben"
})

//  2a Ein bestimmtes Bewertung anhand einer bestimmten ServiceID finden
router.get('/ofService/:ID', authenticateToken, async (req, res) => {
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
router.post('/', authenticateToken, async(req, res) => {
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
router.put('/:id',authenticateToken, getRatingByID, async(req, res) => {
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

router.delete('/:id', getRatingByID, async(req, res) => {
    try{
        const deletedBewertung = await bewertungsModel.deleteOne(res.bewertung) //unser Product aus der MiddleWare Funktion soll gelöscht werden
        res.status(200).json({deletedBewertung});
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

async function getRatingByID(req, res, next){
    let bewertung; //leere Bewertung schaffen
    try{

        //das eine Bewertung mit der entsprechenden ID finden --> die ID steht in der URL unter dem Parameter ID
        bewertung = await bewertungsModel.findById(req.params.id);

        //Ergebnisse Unterscheiden 
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

module.exports = router;