const mongoose = require('mongoose');

const adAccountSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['facebook', 'google', 'tiktok']
  },
  accountId: {
    type: String,
    required: true,
    trim: true
  },
  accountName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'disabled', 'pending'],
    default: 'pending'
  },
  billingInfo: {
    currency: {
      type: String,
      default: 'VND'
    },
    spendLimit: {
      type: Number,
      default: 0
    },
    currentSpend: {
      type: Number,
      default: 0
    }
  },
  accessToken: {
    type: String,
    required: true,
    select: false // Hide this field by default in queries
  },
  accessTokenExpires: {
    type: Date
  },
  lastSync: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
adAccountSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
adAccountSchema.index({ client: 1, platform: 1, accountId: 1 }, { unique: true });

const AdAccount = mongoose.model('AdAccount', adAccountSchema);

module.exports = AdAccount; 