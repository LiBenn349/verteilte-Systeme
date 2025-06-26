//ALLE ENDPOINTS ZUM PRODUKT LADEN IN DIESER DATEI

const express = require('express');
const mietwagenModel = require('../models/mietwagenModel');

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
router.get('/', async (req, res) => {
    try{

        //Alle Products vom Model finden
        const mietwagen = await mietwagenModel.find();//Wir warten ab bis die Datenbank uns alle Products ausgibt
        res.status(200).json(mietwagen);//senden die Produkte ans Frotend

    }catch(err){
        res.status(500).json({message: err.message});//geben wir im Fehlerfall einen 500-Serverfehler aus 
    }
})

//    2. Ein bestimmtes Produkt anhand seiner (ID) finden
router.get("/:id", getMietwagenByID, (req,res) => {
    res.status(200).json(res.mietwagen); //aus der MiddleWare Funktion getMietwagenByID wurde in res.mietwagen bereits das eine bestimmte Produkt "reingeschrieben"
})

//    3. Ein bestimmtes Produkt schreiben 
router.post('/', async(req, res) => {
    try{

        //Erstellen eines neuen Products
        const mietwagen = new mietwagenModel({
            //Das was im Model als Attribute definiert ist, muss hier befüllt werden sofern diese Required sind
            autoID: req.body.autoID,
            autoMarke: req.body.autoMarke,
            autoModell: req.body.autoModell,
            baujahr: req.body.baujahr,
            beschreibung: req.body.beschreibung,
            preis: req.body.preis
        })

        const newMietwagen = await mietwagen.save();//Die Datenbank schreibt das neue Product, sofern es erfolgreich angelegt wurde, erhalten wir das Product inkl. ID und Version von der Datenbank zurück

        res.status(201).json(newMietwagen);//neues Product an Client zurückschicken

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//    4. Ein bestimmtes Produkt updaten (ID)
router.put('/:id', getMietwagenByID, async(req, res) => {
    try{
        //Das Produkt mit der übergebenen ID steht in res.mietwagen durch die Middleware Funktion bereit
        //Wir updaten es mit den Werten aus dem Request
        if(req.body.autoID){
            res.mietwagen.autoID = req.body.autoID;
        }
        if(req.body.autoMarke){
            res.mietwagen.autoMarke = req.body.autoMarke;
        }
        if(req.body.autoModell){
            res.mietwagen.autoModell = req.body.autoModell;
        }
        if(req.body.baujahr){
            res.mietwagen.baujahr = req.body.baujahr;
        }
        if(req.body.beschreibung){
            res.mietwagen.beschreibung = req.body.beschreibung;
        }
        if(req.body.preis){
            res.mietwagen.preis = req.body.preis;
        }

        if(!req.body.autoID && !req.body.autoMarke && !req.body.autoModell && !req.body.baujahr && !req.body.beschreibung && !req.body.preis){
            res.status(400).json({message: 'Fehlerhafte Anfrage zum Updaten des Mietwagens'});
        }
       
        //Wir schreiben dann die Veränderungen in die Datenbank
        const updatedMietwagen = await res.mietwagen.save();//als Ergebnis von save erhalten wir hier das geupdatete Produkt aus der DB zurück

        res.status(201).json(updatedMietwagen);

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id', getMietwagenByID, async(req, res) => {
    try{
        const deletedMietwagen = await mietwagenModel.deleteOne(res.mietwagen) //unser Mietwagen aus der MiddleWare Funktion soll gelöscht werden
        res.status(200).json({deletedMietwagen});
    }catch(error){
        res.status(500).json({message: error.message});
    }
})


//Middleware funktion
async function getMietwagenByID(req, res, next){
    let mietwagen; //leere Mietwagenhülle schaffen
    try{

        //das eine Mietwagen mit der entsprechenden ID finden --> die ID steht in der URL unter dem Parameter ID
        mietwagen = await mietwagenModel.findById(req.params.id);

        //Ergebnisse Unterscheiden
        //Falls kein Mietwagen mit der ID gefunden werden kann, soll die Abfrage hier enden und die Response zum Client geschickt
        if(mietwagen == null){
            return res.status(404).json({message: "Mietwagen mit der ID " + req.params.id + " konnte nicht gefunden werden"});
        }//Falls alles passt geht es nach dem Catch weiter


    }catch(err){
        res.status(500).json({message: err.message});
    }

    //Hier geht es weiter
    res.mietwagen = mietwagen;
    next();
}

//Router verfügbar mache
module.exports = router; 