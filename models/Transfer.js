const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  fromClub: {
    type: String,
    required: true
  },
  toClub: {
    type: String,
    required: true
  },
  fee: {
    type: String
  },
  position: {
    type: String
  },
  age: {
    type: Number
  },
  status: {
    type: String,
    enum: ['rumor', 'confirmed'],
    default: 'rumor'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transfer', TransferSchema);