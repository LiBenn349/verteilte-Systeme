// models/bewertung.js
const mongoose = require('mongoose');

const bewertungsModel = new mongoose.Schema({
  serviceTyp: { //Welcher Service wird bewertet?
    type: String,
    required: true,
    enum: ['hotel', 'flugverbindung', 'mietwagen']
  },
  serviceId: { //ID des bewerteten Objekts
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true //Jedes Objekt sollte eine eindeutige ID haben
  },
  nutzerName: { //Name des Nutzers, der die Bewertung abgibt
    type: String,
    required: true
  },
  wert: { //Bewertung zwischen 1 und 5
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  kommentar: { //Kommentar des Nutzers zur Bewertung, optional
    type: String,
    required: false
  },
  erstelltAm: { //Datum, an dem die Bewertung erstellt wurde
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true //Timestamp bei Erstellung für System
});

//Verfügbar machen des Schemas
module.exports = mongoose.model('bewertungsModel', bewertungsModel);
