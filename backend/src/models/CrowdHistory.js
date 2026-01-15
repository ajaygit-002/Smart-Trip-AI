const mongoose = require('mongoose');

const crowdHistorySchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  timeSlot: {
    type: String,
    required: true,
  },
  crowdScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  crowdLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High']
  },
  isWeekend: Boolean,
  isHoliday: Boolean,
  weather: String,
  season: String,
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate crowd level based on score
crowdHistorySchema.pre('save', function(next) {
  if (this.crowdScore <= 25) this.crowdLevel = 'Low';
  else if (this.crowdScore <= 50) this.crowdLevel = 'Medium';
  else if (this.crowdScore <= 75) this.crowdLevel = 'High';
  else this.crowdLevel = 'Very High';
  next();
});

module.exports = mongoose.model('CrowdHistory', crowdHistorySchema);
