
//Initialisierung Mongoose
const mongoose = require('mongoose');

//Erstellen des Schemas für Produkte
//Produkte sollen einen Namen, eine Beschreibung und einen Preis


const hotelModel = new mongoose.Schema({
    hotelID: {
        type: mongoose.Schema.Types.ObjectId, //ID des Hotels, zu dem das Zimmer gehört
        required: true,
        unique: true //Jedes Hotel sollte eine eindeutige ID haben
    },
    hotelName: { //Name des Hotels
        type: String,
        required: true
    },
    straße: { //Straße des Hotels
        type: String,
        required: true
    },
    hausnummer: { //Hausnummer des Hotels
        type: Number,
        required: true
    }, 
    ort: { //Ort in dem sich das Hotel befindet
        type: String,
        required: true
    },
    postleitzahl: { //Postleitzahl des Ortes
        type: Number,
        required: true
    },
    land: { //Land in dem sich das Hotel befindet
        type: String,
        required: true
    },
    anzahlFreieZimmer: {//Anzahl der freien Zimmer im Hotel
        type: Number,
        required: true,
        min: 0 //Mindestanzahl an freien Zimmern
    },
    zimmerBeschreibung: { //Beschreibung des Zimmers
        type: String,
        required: true
    },
    zimmerTyp: { //Typ des Zimmers, z.B. Einzelzimmer, Doppelzimmer, Suite
        type: String,
        required: true,
        enum: ['Einzelzimmer', 'Doppelzimmer', 'Suite']
    },
    haustierErlaubt: { //Haustiere erlaubt oder nicht
        type: Boolean,
        default: false //Standardwert ist false, Haustiere nicht erlaubt
    },
    preis: { //Preis des Zimmers pro Nacht
        type: Number,
        required: true
    }
}, {
  timestamps: true
});
// verfügbar machen
module.exports = mongoose.model('hotelModel', hotelModel);
