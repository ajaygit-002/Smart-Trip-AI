const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['crowd-alert', 'best-time', 'itinerary-update', 'alternative-suggestion']
  },
  relatedPlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
  relatedItinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
