const Transfer = require('../models/Transfer');

// Get all transfers
exports.getAllTransfers = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }

    const transfers = await Transfer.find(query).sort('-createdAt');
    res.json(transfers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get single transfer
exports.getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({ msg: 'Transfer not found' });
    }
    res.json(transfer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Transfer not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create transfer (admin only)
exports.createTransfer = async (req, res) => {
  try {
    const { playerName, fromClub, toClub, fee, position, age, status } = req.body;
    
    const newTransfer = new Transfer({
      playerName,
      fromClub,
      toClub,
      fee,
      position,
      age,
      status
    });

    const transfer = await newTransfer.save();
    res.json(transfer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update transfer (admin only)
exports.updateTransfer = async (req, res) => {
  try {
    const { playerName, fromClub, toClub, fee, position, age, status } = req.body;
    
    const transfer = await Transfer.findByIdAndUpdate(
      req.params.id,
      { $set: { playerName, fromClub, toClub, fee, position, age, status } },
      { new: true }
    );

    if (!transfer) {
      return res.status(404).json({ msg: 'Transfer not found' });
    }

    res.json(transfer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete transfer (admin only)
exports.deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    
    if (!transfer) {
      return res.status(404).json({ msg: 'Transfer not found' });
    }

    await transfer.remove();
    res.json({ msg: 'Transfer removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Transfer not found' });
    }
    res.status(500).send('Server error');
  }
};