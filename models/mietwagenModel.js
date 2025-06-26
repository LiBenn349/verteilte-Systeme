//Initialisierung Mongoose
const mongoose = require('mongoose');

//Erstellen des Schemas für Produkte
//Produkte sollen einen Namen, eine Beschreibung und einen Preis


const mietwagenModel = new mongoose.Schema({
    autoID: {
        type: mongoose.Schema.Types.ObjectId, //ID des Autos
        required: true,
        unique: true //Jedes Auto sollte eine eindeutige ID haben
    },
    autoMarke: { //Marke des Autos
        type: String,
        required: true
    },
    autoModell: { //Modell des Autos
        type: String,
        required: true
    },
    baujahr: { //Baujahr des Autos
        type: Number,
        required: true
    },
    beschreibung: { //Beschreibung des Autos
        type: String,
        required: true
    },
    preis: { //Preis des Autos pro Nacht
        type: Number,
        required: true
    }
},{
  timestamps: true
});
// verfügbar machen
module.exports = mongoose.model('mietwagenModel', mietwagenModel);