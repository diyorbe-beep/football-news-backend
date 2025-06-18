const News = require('../models/News');
const fs = require('fs');
const path = require('path');

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate('author', 'username').sort('-createdAt');
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get single news
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'username');
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create news (admin only)
exports.createNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path;
    }

    const newNews = new News({
      title,
      content,
      image: imagePath,
      category,
      author: req.user.id
    });

    const news = await newNews.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update news (admin only)
exports.updateNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    let updateFields = {
      title,
      content,
      category,
      updatedAt: Date.now()
    };

    if (req.file) {
      updateFields.image = req.file.path;
      // Delete old image if exists
      const oldNews = await News.findById(req.params.id);
      if (oldNews.image && fs.existsSync(oldNews.image)) {
        fs.unlinkSync(oldNews.image);
      }
    }

    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }

    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete news (admin only)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }

    // Delete image if exists
    if (news.image && fs.existsSync(news.image)) {
      fs.unlinkSync(news.image);
    }

    await news.remove();
    res.json({ msg: 'News removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.status(500).send('Server error');
  }
};