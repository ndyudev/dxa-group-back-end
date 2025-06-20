const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Social Media', 'Content Creation', 'Digital Advertising', 'Brand Strategy']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema); 