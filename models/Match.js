const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  homeScore: {
    type: Number
  },
  awayScore: {
    type: Number
  },
  date: {
    type: Date,
    required: true
  },
  stadium: {
    type: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  league: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Match', MatchSchema);