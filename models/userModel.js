const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    unique: true 
  },
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true, 
    enum: ['admin', 'user'],
    default: 'user'
  },

});

module.exports = mongoose.model('User', UserModel);