const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Monument', 'Beach', 'Park', 'Museum', 'Temple', 'Market', 'Food', 'Other']
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    }
  },
  description: String,
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  avgVisitDuration: {
    type: Number,
    default: 60,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  entryFee: Number,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Place', placeSchema);
