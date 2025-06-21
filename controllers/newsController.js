const News = require('../models/News');
const fs = require('fs');
const path = require('path');

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const news = await News.find(query)
      .populate('author', 'username')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await News.countDocuments(query);
    
    res.json({
      success: true,
      data: news,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get single news
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'username');
    if (!news) {
      return res.status(404).json({ 
        success: false,
        error: 'News not found' 
      });
    }
    res.json({
      success: true,
      data: news
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        error: 'News not found' 
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
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
    await news.populate('author', 'username');
    
    res.status(201).json({
      success: true,
      data: news,
      message: 'News created successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
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
      if (oldNews && oldNews.image && fs.existsSync(oldNews.image)) {
        fs.unlinkSync(oldNews.image);
      }
    }

    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate('author', 'username');

    if (!news) {
      return res.status(404).json({ 
        success: false,
        error: 'News not found' 
      });
    }

    res.json({
      success: true,
      data: news,
      message: 'News updated successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Delete news (admin only)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ 
        success: false,
        error: 'News not found' 
      });
    }

    // Delete image if exists
    if (news.image && fs.existsSync(news.image)) {
      fs.unlinkSync(news.image);
    }

    await News.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true,
      message: 'News deleted successfully' 
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        error: 'News not found' 
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};