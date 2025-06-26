//ALLE ENDPOINTS ZUM PRODUKT LADEN IN DIESER DATEI

const express = require('express');
const hotelModel = require('../models/hotelModel');

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
        const hotel = await hotelModel.find();//Wir warten ab bis die Datenbank uns alle Products ausgibt
        res.status(200).json(hotel);//senden die Produkte ans Frotend

    }catch(err){
        res.status(500).json({message: err.message});//geben wir im Fehlerfall einen 500-Serverfehler aus 
    }
})

//    2. Ein bestimmtes Produkt anhand seiner (ID) finden
router.get("/:id", getHotelByID, (req,res) => {
    res.status(200).json(res.hotel); //aus der MiddleWare Funktion getHotelByID wurde in res.hotel bereits das eine bestimmte Produkt "reingeschrieben"
})

//    3. Ein bestimmtes Produkt schreiben 
router.post('/', async(req, res) => {
    try{

        //Erstellen eines neuen Products
        const product = new productModel({
            //Das was im Model als Attribute definiert ist, muss hier befüllt werden sofern diese Required sind
            hotelID: req.body.hotelID, //ID des Hotels, zu dem das Zimmer gehört
            hotelName: req.body.hotelName, //Name des Hotels
            straße: req.body.straße, //Straße des Hotels
            hausnummer: req.body.hausnummer, //Hausnummer des Hotels
            ort: req.body.ort, //Ort in dem sich das Hotel befindet
            postleitzahl: req.body.postleitzahl, //Postleitzahl des Ortes
            land: req.body.land, //Land in dem sich das Hotel befindet
            anzahlFreieZimmer: req.body.anzahlFreieZimmer, //Anzahl der freien Zimmer im Hotel
            zimmerBeschreibung: req.body.zimmerBeschreibung, //Beschreibung des Zimmers
            zimmerTyp: req.body.zimmerTyp, //Typ des Zimmers, z.B. Einzelzimmer, Doppelzimmer, Suite
            haustierErlaubt: req.body.haustierErlaubt, //Haustiere erlaubt oder nicht
            preis: req.body.preis //Preis des Zimmers pro Nacht
        })

        const newHotel = await hotel.save();//Die Datenbank schreibt das neue Product, sofern es erfolgreich angelegt wurde, erhalten wir das Product inkl. ID und Version von der Datenbank zurück

        res.status(201).json(newHotel);//neues Hotel an Client zurückschicken

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//    4. Ein bestimmtes Produkt updaten (ID)
router.put('/:id', getHotelByID, async(req, res) => {
    try{
        //Das Product mit der übergebenen ID steht in res.product durch die Middleware Funktion bereit
        //Wir updaten es mit den Werten aus dem Request
        if(req.body.hotelID){
            res.hotel.hotelID = req.body.hotelID;
        }
        if(req.body.hotelName){
            res.hotel.hotelName = req.body.hotelName;
        }
        if(req.body.straße){
            res.hotel.straße = req.body.straße;
        }
        if(req.body.hausnummer){
            res.hotel.hausnummer = req.body.hausnummer;
        }
        if(req.body.ort){
            res.hotel.ort = req.body.ort;
        }
        if(req.body.postleitzahl){
            res.hotel.postleitzahl = req.body.postleitzahl;
        }
        if(req.body.land){
            res.hotel.land = req.body.land;
        }
        if(req.body.anzahlFreieZimmer){
            res.hotel.anzahlFreieZimmer = req.body.anzahlFreieZimmer;
        }
        if(req.body.zimmerBeschreibung){
            res.hotel.zimmerBeschreibung = req.body.zimmerBeschreibung;
        }
        if(req.body.zimmerTyp){
            res.hotel.zimmerTyp = req.body.zimmerTyp;
        }
        if(req.body.haustierErlaubt){
            res.hotel.haustierErlaubt = req.body.haustierErlaubt;
        }
        if(req.body.preis){
            res.hotel.preis = req.body.preis;
        }

        if(!req.body.hotelID && !req.body.hotelName && !req.body.straße && !req.body.hausnummer && !req.body.ort && !req.body.postleitzahl && !req.body.land && !req.body.anzahlFreieZimmer && !req.body.zimmerBeschreibung && !req.body.zimmerTyp && !req.body.haustierErlaubt && !req.body.preis){
            res.status(400).json({message: 'Fehlerhafte Anfrage zum Updaten des Hotels'});
        }
       
        //Wir schreiben dann die Veränderungen in die Datenbank
        const updatedHotel = await res.hotel.save();//als Ergebnis von save erhalten wir hier das geupdatete Produkt aus der DB zurück

        res.status(201).json(updatedHotel);

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id', getHotelByID, async(req, res) => {
    try{
        const deletedHotel = await hotelModel.deleteOne(res.hotel) //unser Hotel aus der MiddleWare Funktion soll gelöscht werden
        res.status(200).json({deletedHotel});
    }catch(error){
        res.status(500).json({message: error.message});
    }
})


//Middleware funktion
async function getHotelByID(req, res, next){
    let hotel; //leere Hotelhülle schaffen
    try{

        //das eine Hotel mit der entsprechenden ID finden --> die ID steht in der URL unter dem Parameter ID
        hotel = await hotelModel.findById(req.params.id);

        //Ergebnisse Unterscheiden
        //Falls kein Hotel mit der ID gefunden werden kann, soll die Abfrage hier enden und die Response zum Client geschickt
        if(hotel == null){
            return res.status(404).json({message: "Hotel mit der ID " + req.params.id + " konnte nicht gefunden werden"});
        }//Falls alles passt geht es nach dem Catch weiter


    }catch(err){
        res.status(500).json({message: err.message});
    }

    //Hier geht es weiter
    res.product = product;
    next();
}

//Router verfügbar mache
module.exports = router; 
