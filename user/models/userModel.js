const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
  id: { // Eindeutige ID des Users im System
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    unique: true 
  },
  username: { // Eindeutiger Username, des Users
    type: String, 
    required: true,
    unique: true
  },
  password: { // Passwort des Userkontos
    type: String, 
    required: true 
  },
  role: { // Rolle des Userkontos
    type: String, 
    required: true, 
    enum: ['admin', 'user'],
    default: 'user'
  },

});

// Verfügbar machen des Schemas
module.exports = mongoose.model('User', UserModel);
