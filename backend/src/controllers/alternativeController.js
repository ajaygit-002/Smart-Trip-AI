const Place = require('../models/Place');
const axios = require('axios');

// Calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get alternative places
exports.getAlternatives = async (req, res) => {
  try {
    const { placeId, city, radius = 5 } = req.body;

    if (!placeId || !city) {
      return res.status(400).json({ error: 'placeId and city are required' });
    }

    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Get all places in same city
    const allPlaces = await Place.find({
      city,
      _id: { $ne: placeId }
    });

    // Get crowd predictions for all places
    const placesWithCrowd = await Promise.all(
      allPlaces.map(async (p) => {
        const distance = calculateDistance(
          place.location.lat,
          place.location.lng,
          p.location.lat,
          p.location.lng
        );

        if (distance > radius) return null;

        try {
          const crowdResponse = await axios.post(process.env.ML_API_URL + '/predict', {
            hour: new Date().getHours(),
            weekday: new Date().getDay(),
            weekend: [0, 6].includes(new Date().getDay()),
            holiday: false,
          });

          return {
            placeId: p._id,
            name: p.name,
            category: p.category,
            distance,
            rating: p.rating,
            crowdScore: crowdResponse.data.crowd_score,
            crowdLevel: crowdResponse.data.crowd_level,
            entryFee: p.entryFee,
            avgVisitDuration: p.avgVisitDuration,
            location: p.location,
          };
        } catch (error) {
          return {
            placeId: p._id,
            name: p.name,
            category: p.category,
            distance,
            rating: p.rating,
            crowdScore: Math.floor(Math.random() * 100),
            entryFee: p.entryFee,
          };
        }
      })
    );

    // Filter null values and sort by crowd + distance
    const alternatives = placesWithCrowd
      .filter(p => p !== null)
      .sort((a, b) => {
        const scoreA = (a.crowdScore * 0.6) + (a.distance * 10);
        const scoreB = (b.crowdScore * 0.6) + (b.distance * 10);
        return scoreA - scoreB;
      })
      .slice(0, 5);

    res.json({
      originalPlace: place,
      alternatives,
      city
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nearby places
exports.getNearbyPlaces = async (req, res) => {
  try {
    const { lat, lng, city, radius = 2 } = req.query;

    if (!lat || !lng || !city) {
      return res.status(400).json({ error: 'lat, lng, and city are required' });
    }

    const places = await Place.find({ city });

    const nearby = places
      .map(p => ({
        ...p.toObject(),
        distance: calculateDistance(
          parseFloat(lat),
          parseFloat(lng),
          p.location.lat,
          p.location.lng
        )
      }))
      .filter(p => p.distance <= parseFloat(radius))
      .sort((a, b) => a.distance - b.distance);

    res.json(nearby);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
