const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  state: String,
  category: {
    type: String,
    required: true,
    enum: [
      "Monument",
      "Beach",
      "Park",
      "Museum",
      "Temple",
      "Market",
      "Food",
      "Hotel",
      "Heritage",
      "Entertainment",
      "Other",
    ],
    index: true,
  },
  tags: [String],
  description: String,
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  address: String,
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
  entryFee: Number,
  bestTimeToVisit: [String],
  idealSeason: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  popularityScore: Number,
  budgetRange: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  avgCost: Number,
  nearbyTransport: [String],
  recommendedFor: [String],
  crowdPattern: {
    weekday: {
      morning: Number,
      afternoon: Number,
      evening: Number,
    },
    weekend: {
      morning: Number,
      afternoon: Number,
      evening: Number,
    },
  },
  images: [String],
  imageUrl: String,
  facilities: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("Place", placeSchema);
