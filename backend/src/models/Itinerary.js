const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  places: [{
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    plannedTime: {
      type: String,
      required: true,
    },
    predictedCrowd: String,
    crowdScore: Number,
    visitDuration: Number,
    order: Number,
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  autoReplanCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
