const CrowdHistory = require('../models/CrowdHistory');
const Place = require('../models/Place');
const axios = require('axios');

// Predict crowd for a place at specific time
exports.predictCrowd = async (req, res) => {
  try {
    const { placeId, dateTime } = req.body;
    
    if (!placeId || !dateTime) {
      return res.status(400).json({ error: 'placeId and dateTime are required' });
    }

    const date = new Date(dateTime);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const hour = date.getHours();
    const timeSlot = `${hour}:00`;

    // Try to get historical data first
    let crowdHistory = await CrowdHistory.findOne({
      placeId,
      day,
      timeSlot,
    });

    if (crowdHistory) {
      return res.json({
        placeId,
        dateTime,
        crowdScore: crowdHistory.crowdScore,
        crowdLevel: crowdHistory.crowdLevel,
        source: 'historical'
      });
    }

    // Call ML API for prediction
    try {
      const mlResponse = await axios.post(process.env.ML_API_URL + '/predict', {
        hour,
        weekday: date.getDay(),
        weekend: [0, 6].includes(date.getDay()),
        holiday: false, // Can be enhanced with holiday API
      });

      const prediction = {
        placeId,
        dateTime,
        crowdScore: mlResponse.data.crowd_score,
        crowdLevel: mlResponse.data.crowd_level,
        source: 'ml-model'
      };

      res.json(prediction);
    } catch (mlError) {
      // Fallback prediction
      const fallbackScore = Math.floor(Math.random() * 100);
      res.json({
        placeId,
        dateTime,
        crowdScore: fallbackScore,
        crowdLevel: fallbackScore <= 25 ? 'Low' : fallbackScore <= 50 ? 'Medium' : fallbackScore <= 75 ? 'High' : 'Very High',
        source: 'fallback'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get best visiting times for next 24 hours
exports.getBestTimes = async (req, res) => {
  try {
    const { placeId } = req.body;

    if (!placeId) {
      return res.status(400).json({ error: 'placeId is required' });
    }

    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    const predictions = [];
    const now = new Date();

    // Get predictions for next 24 hours
    for (let i = 0; i < 24; i++) {
      const checkTime = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = checkTime.getHours();
      const timeSlot = `${hour}:00`;

      try {
        const response = await axios.post(process.env.ML_API_URL + '/predict', {
          hour,
          weekday: checkTime.getDay(),
          weekend: [0, 6].includes(checkTime.getDay()),
          holiday: false,
        });

        predictions.push({
          time: checkTime,
          crowdScore: response.data.crowd_score,
          crowdLevel: response.data.crowd_level,
        });
      } catch (e) {
        predictions.push({
          time: checkTime,
          crowdScore: Math.floor(Math.random() * 100),
        });
      }
    }

    // Sort to find best times
    const sorted = predictions.sort((a, b) => a.crowdScore - b.crowdScore);

    res.json({
      placeId,
      bestTimes: sorted.slice(0, 3),
      avoidTimes: sorted.slice(-3).reverse(),
      allPredictions: predictions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get historical crowd data
exports.getCrowdHistory = async (req, res) => {
  try {
    const { placeId, days = 7 } = req.query;

    if (!placeId) {
      return res.status(400).json({ error: 'placeId is required' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const history = await CrowdHistory.find({
      placeId,
      recordedAt: { $gte: startDate }
    }).sort({ recordedAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Record crowd data
exports.recordCrowdData = async (req, res) => {
  try {
    const crowdRecord = new CrowdHistory(req.body);
    await crowdRecord.save();
    res.status(201).json(crowdRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
