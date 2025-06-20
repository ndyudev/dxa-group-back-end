const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Social Media', 'Brand Strategy', 'Content Creation', 'Digital Advertising']
  },
  client: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  results: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
portfolioSchema.index({ category: 1, featured: 1, isActive: 1 });
portfolioSchema.index({ order: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema); 