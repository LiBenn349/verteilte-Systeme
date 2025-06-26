
const mongoose = require('mongoose');

const flugModel = new mongoose.Schema({
  flugId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true // Jede Flugverbindung sollte eine eindeutige ID haben
  },

  flugDatum: {
    type: Date,
    required: true
  },

  flugUhrzeit: {
    type: String,
    required: true
  },

  flugDauer: {
    type: String,
    required: true
  },

  startOrt: {
    type: String,
    required: true
  },

  zielOrt: {
    type: String,
    required: true
  },
  
  flugGesellschaft: {
    type: Number,
    required: true
  },

  beschreibung: {
    type: String,
    required: true
  },

  preis: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('flugVerbindung', flugModel);
