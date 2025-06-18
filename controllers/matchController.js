const Match = require('../models/Match');

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }

    const matches = await Match.find(query).sort('date');
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get single match
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.json(match);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create match (admin only)
exports.createMatch = async (req, res) => {
  try {
    const { homeTeam, awayTeam, date, stadium, league } = req.body;
    
    const newMatch = new Match({
      homeTeam,
      awayTeam,
      date,
      stadium,
      league
    });

    const match = await newMatch.save();
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update match (admin only)
exports.updateMatch = async (req, res) => {
  try {
    const { homeTeam, awayTeam, homeScore, awayScore, date, stadium, status, league } = req.body;
    
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { $set: { homeTeam, awayTeam, homeScore, awayScore, date, stadium, status, league } },
      { new: true }
    );

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete match (admin only)
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    await match.remove();
    res.json({ msg: 'Match removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.status(500).send('Server error');
  }
};