const Itinerary = require('../models/Itinerary');
const Place = require('../models/Place');
const Notification = require('../models/Notification');
const axios = require('axios');

// Create itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { userId, date, placeIds } = req.body;

    if (!userId || !date || !placeIds || placeIds.length === 0) {
      return res.status(400).json({ error: 'userId, date, and placeIds are required' });
    }

    // Fetch all places
    const places = await Place.find({ _id: { $in: placeIds } });

    // Get crowd predictions for each place
    const itineraryPlaces = await Promise.all(
      places.map(async (place, index) => {
        try {
          const crowdResponse = await axios.post(process.env.ML_API_URL + '/predict', {
            hour: 10 + index, // Staggered times
            weekday: new Date(date).getDay(),
            weekend: [0, 6].includes(new Date(date).getDay()),
            holiday: false,
          });

          return {
            placeId: place._id,
            plannedTime: `${10 + index}:00`,
            predictedCrowd: crowdResponse.data.crowd_level,
            crowdScore: crowdResponse.data.crowd_score,
            visitDuration: place.avgVisitDuration,
            order: index + 1,
          };
        } catch (error) {
          return {
            placeId: place._id,
            plannedTime: `${10 + index}:00`,
            predictedCrowd: 'Unknown',
            crowdScore: 50,
            visitDuration: place.avgVisitDuration,
            order: index + 1,
          };
        }
      })
    );

    const itinerary = new Itinerary({
      userId,
      date,
      places: itineraryPlaces,
    });

    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user itinerary
exports.getUserItinerary = async (req, res) => {
  try {
    const { userId } = req.params;

    const itineraries = await Itinerary.find({ userId })
      .populate('places.placeId')
      .sort({ date: -1 });

    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific itinerary
exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('places.placeId');

    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Replan itinerary (Smart Algorithm)
exports.replanItinerary = async (req, res) => {
  try {
    const { itineraryId } = req.params;

    const itinerary = await Itinerary.findById(itineraryId)
      .populate('places.placeId');

    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    // Get current crowd predictions for all places
    const updatedPlaces = await Promise.all(
      itinerary.places.map(async (p) => {
        try {
          const crowdResponse = await axios.post(process.env.ML_API_URL + '/predict', {
            hour: parseInt(p.plannedTime.split(':')[0]),
            weekday: new Date(itinerary.date).getDay(),
            weekend: [0, 6].includes(new Date(itinerary.date).getDay()),
            holiday: false,
          });

          return {
            ...p.toObject(),
            crowdScore: crowdResponse.data.crowd_score,
            predictedCrowd: crowdResponse.data.crowd_level,
          };
        } catch (error) {
          return p.toObject();
        }
      })
    );

    // Sort by crowd level (low crowd first), then by distance
    const replanedPlaces = updatedPlaces
      .sort((a, b) => a.crowdScore - b.crowdScore)
      .map((p, index) => ({
        ...p,
        order: index + 1,
        plannedTime: `${10 + index}:00`, // Adjust times
      }));

    itinerary.places = replanedPlaces;
    itinerary.autoReplanCount += 1;
    itinerary.lastUpdated = new Date();
    await itinerary.save();

    // Create notification
    const notification = new Notification({
      userId: itinerary.userId,
      message: `Your itinerary has been updated! Visit low-crowd places first.`,
      type: 'itinerary-update',
      relatedItinerary: itinerary._id,
    });
    await notification.save();

    // Send WebSocket notification
    if (req.io) {
      req.io.to(`user-${itinerary.userId}`).emit('itinerary-updated', {
        itineraryId: itinerary._id,
        message: notification.message,
      });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update itinerary
exports.updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
