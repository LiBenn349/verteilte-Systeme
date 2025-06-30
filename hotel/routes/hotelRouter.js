// Diese Datei enthält alle Endpunkte (Routen) für den Hotel-Microservice

// -----------------------------
// Benötigte Module einbinden
// -----------------------------
const express = require('express');
const hotelModel = require('../models/hotelModel');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = process.env.SECRET; // Das gleiche Secret wie im User-Service

//router JSON fähig machen
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
        req.user = { userID: decoded.userID, rolle: decoded.rolle, isAdmin: decoded.isAdmin };
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
// Middleware: Holt ein Hotel anhand seiner ID aus der Datenbank
// --------------------------------------------------
async function getHotelByID(req, res, next) {
    let hotel;
    try {
        hotel = await hotelModel.findById(req.params.id);
        if (hotel == null) {
            return res.status(404).json({ message: "Hotel mit der ID " + req.params.id + " konnte nicht gefunden werden" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.hotel = hotel;
    next();
}

// --------------------------------------------------
// REST-API ENDPOINTS
// --------------------------------------------------

//    1. Alle Hotels lesen
router.get('/', authMiddleware, async (req, res) => {
    try {
        const hotels = await hotelModel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//    2. Ein bestimmtes Hotel anhand seiner ID finden
router.get('/:id', authMiddleware, getHotelByID, (req, res) => {
    res.status(200).json(res.hotel);
});

//    3. Ein neues Hotel erstellen
router.post('/', authMiddleware, checkAdmin, async (req, res) => {
    try {
        const hotel = new hotelModel({
            hotelID: req.body.hotelID,
            hotelName: req.body.hotelName,
            straße: req.body.straße,
            hausnummer: req.body.hausnummer,
            ort: req.body.ort,
            postleitzahl: req.body.postleitzahl,
            land: req.body.land,
            anzahlFreieZimmer: req.body.anzahlFreieZimmer,
            zimmerBeschreibung: req.body.zimmerBeschreibung,
            zimmerTyp: req.body.zimmerTyp,
            haustierErlaubt: req.body.haustierErlaubt,
            preis: req.body.preis
        });

        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//    4. Ein Hotel updaten
router.put('/:id', authMiddleware, checkAdmin, getHotelByID, async (req, res) => {
    try {
        const fields = [
            'hotelID', 'hotelName', 'straße', 'hausnummer', 'ort', 'postleitzahl',
            'land', 'anzahlFreieZimmer', 'zimmerBeschreibung', 'zimmerTyp',
            'haustierErlaubt', 'preis'
        ];

        let isUpdated = false;

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                res.hotel[field] = req.body[field];
                isUpdated = true;
            }
        });

        if (!isUpdated) {
            return res.status(400).json({ message: 'Keine gültigen Felder zum Updaten übergeben' });
        }

        const updatedHotel = await res.hotel.save();
        res.status(201).json(updatedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//    5. Ein Hotel löschen
router.delete('/:id', authMiddleware, checkAdmin, getHotelByID, async (req, res) => {
    try {
        const deletedHotel = await hotelModel.deleteOne({ _id: res.hotel._id });
        res.status(200).json({ deletedHotel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --------------------------------------------------
// Export des Routers für die Verwendung in der Server-Datei
// --------------------------------------------------
module.exports = router;
