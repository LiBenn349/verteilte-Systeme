//ALLE ENDPOINTS ZUM PRODUKT LADEN IN DIESER DATEI

const express = require('express');
const flugModel = require('../models/flugModel');
const auth = require('../middleware/authMiddleware'); //Importiere die Authentifizierungs-Middleware, falls benötigt
const authMiddleware = require('../middleware/authMiddleware');

//ACHTUNG --> hier keine "normale" express Iniitialisierung
const router = express.Router();

//router JSON fähig machen
router.use(express.json());

/*5 Endpoints erstellen
    1. Alle Produkte lesen
    2. Ein bestimmtes Produkt anhand seiner ID finden
    3. Ein bestimmtes Produkt schreiben
    4. Ein bestimmtes Produkt updaten
    5. Ein bestimmtes Produkt löschen
*/

//    1. Alle Produkte lesen
router.get('/', authMiddleware, async (req, res) => {
    try{

        //Alle Products vom Model finden
        const flug = await flugModel.find();//Wir warten ab bis die Datenbank uns alle Products ausgibt
        res.status(200).json(flug);//senden die Produkte ans Frotend

    }catch(err){
        res.status(500).json({message: err.message});//geben wir im Fehlerfall einen 500-Serverfehler aus 
    }
})

//    2. Ein bestimmtes Produkt anhand seiner (ID) finden
router.get("/:id", authMiddleware, getFlugByID, (req,res) => {
    res.status(200).json(res.flug); //aus der MiddleWare Funktion getFlugByID wurde in res.flug bereits das eine bestimmte Produkt "reingeschrieben"
})

//    3. Ein bestimmtes Produkt schreiben 
router.post('/', authMiddleware, async(req, res) => {
    try{

        //Erstellen eines neuen Products
        const flug = new flugModel({
            //Das was im Model als Attribute definiert ist, muss hier befüllt werden sofern diese Required sind
            serviceId: req.body.serviceId,
            flugNummer: req.body.flugNummer,
            startOrt: req.body.startOrt,
            zielOrt: req.body.zielOrt,
            flugGesellschaft: req.body.flugGesellschaft,
            beschreibung: req.body.beschreibung,
            preis: req.body.preis
        })

        const newFlug = await flug.save();//Die Datenbank schreibt das neue Product, sofern es erfolgreich angelegt wurde, erhalten wir das Product inkl. ID und Version von der Datenbank zurück

        res.status(201).json(newFlug);//neues Product an Client zurückschicken

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//    4. Ein bestimmtes Produkt updaten (ID)
router.put('/:id', authMiddleware, getFlugByID, async(req, res) => {
    try{
        //Das Product mit der übergebenen ID steht in res.product durch die Middleware Funktion bereit
        //Wir updaten es mit den Werten aus dem Request
        if(req.body.serviceId){
            res.flug.serviceId = req.body.serviceId;
        }
         if(req.body.flugNummer){
            res.flug.flugNummer = req.body.flugNummer;
        }
        if(req.body.startOrt){
            res.flug.startOrt = req.body.startOrt;
        }
        if(req.body.zielOrt){
            res.flug.zielOrt = req.body.zielOrt;
        }
        if(req.body.flugGesellschaft){
            res.flug.flugGesellschaft = req.body.flugGesellschaft;
        }
        if(req.body.beschreibung){
            res.flug.beschreibung = req.body.beschreibung;
        }
          if(req.body.preis){
            res.flug.preis = req.body.preis;
        }

        if(!req.body.serviceId && !req.body.flugNummer && !req.body.startOrt && !req.body.zielOrt && !req.body.flugGesellschaft && !req.body.beschreibung && !req.body.preis){
            res.status(400).json({message: 'Fehlerhafte Anfrage zum Updaten des Flugs'});
        }

        //Wir schreiben dann die Veränderungen in die Datenbank
        const updatedFlug = await res.flug.save();//als Ergebnis von save erhalten wir hier das geupdatete Produkt aus der DB zurück

        res.status(201).json(updatedFlug);

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id', authMiddleware, getFlugByID, async(req, res) => {
    try{
        const deletedFlug = await flugModel.deleteOne(res.flug) //unser Product aus der MiddleWare Funktion soll gelöscht werden
        res.status(200).json({deletedFlug});
    }catch(error){
        res.status(500).json({message: error.message});
    }
})


//Middleware funktion
async function getFlugByID(req, res, next){
    let flug; //leere Produkthülle schaffen
    try{

        //das eine Prduct mit der entsprechenden ID finden --> die ID steht in der URL unter dem Parameter ID
        flug = await flugModel.findById(req.params.id);

        //Ergebnisse Unterscheiden 
        //Falls kein Flug mit der ID gefunden werden kann, soll die Abfrage hier enden und die Response zum Client geschickt
        if(flug == null){
            return res.status(404).json({message: "Flug mit der ID " + req.params.id + " konnte nicht gefunden werden"});
        }//Falls alles passt geht es nach dem Catch weiter


    }catch(err){
        res.status(500).json({message: err.message});
    }

    //Hier geht es weiter
    res.flug = flug;
    next();
}

//Router verfügbar mache
module.exports = router;
