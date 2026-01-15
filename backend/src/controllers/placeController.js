const Place = require('../models/Place');

// Get all places in a city
exports.getPlacesByCity = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }
    
    const places = await Place.find({ city });
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get places by category
exports.getPlacesByCategory = async (req, res) => {
  try {
    const { category, city } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (city) query.city = city;
    
    const places = await Place.find(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new place (admin)
exports.createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update place
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    res.json(place);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete place
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
