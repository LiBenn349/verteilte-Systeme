
const mongoose = require('mongoose');

const flugModel = new mongoose.Schema({
  flugId: { // Jeder Flug bekommt eine eingeutige FlugID im System zugeteilt
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true 
  },

  flugDatum: { // Dateum des Flugs
    type: Date,
    required: true
  },

  flugUhrzeit: { // Abflugzeit
    type: String,
    required: true
  },

  flugDauer: { // Dauer des Flugs
    type: String,
    required: true
  },

  startOrt: { // Startflughafen
    type: String,
    required: true
  },

  zielOrt: { // Zielflughafen
    type: String,
    required: true
  },
  
  flugGesellschaft: { // Fluggesellschaft, die den Flug macht
    type: Number,
    required: true
  },

  beschreibung: { // Details zum Flug, Flugzeug oder Gesellschaft
    type: String,
    required: true
  },

  preis: { // Buchungspreis
    type: Number,
    required: true
  },
}, {
  timestamps: true // Zeitstempel im System
});

//Verfügbar machen des Schemas für andere Dateien
module.exports = mongoose.model('flugVerbindung', flugModel);
