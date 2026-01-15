const Place = require("../models/Place");

// Get all places in a city
exports.getPlacesByCity = async (req, res) => {
  try {
    const { city } = req.params || req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const places = await Place.find({ city }).sort({ popularityScore: -1 });
    res.json({
      city,
      count: places.length,
      places,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get places by city and category
exports.getPlacesByCityAndCategory = async (req, res) => {
  try {
    const { city, category } = req.params;
    const places = await Place.find({ city, category }).sort({ rating: -1 });

    if (places.length === 0) {
      return res.status(404).json({
        error: `No ${category} places found in ${city}`,
      });
    }

    res.json({
      city,
      category,
      count: places.length,
      places,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get places by tags
exports.getPlacesByTags = async (req, res) => {
  try {
    const { city } = req.params;
    const { tags } = req.query;

    if (!tags) {
      return res.status(400).json({ error: "Tags parameter is required" });
    }

    const tagArray = tags.split(",").map((tag) => tag.trim());

    const places = await Place.find({
      city,
      tags: { $in: tagArray },
    }).sort({ rating: -1 });

    if (places.length === 0) {
      return res.status(404).json({
        error: `No places found with tags: ${tagArray.join(", ")}`,
      });
    }

    res.json({
      city,
      tags: tagArray,
      count: places.length,
      places,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get places by budget
exports.getPlacesByBudget = async (req, res) => {
  try {
    const { city, budget } = req.params;

    if (!["Low", "Medium", "High"].includes(budget)) {
      return res
        .status(400)
        .json({ error: "Invalid budget. Use: Low, Medium, or High" });
    }

    const places = await Place.find({ city, budgetRange: budget }).sort({
      rating: -1,
    });

    if (places.length === 0) {
      return res.status(404).json({
        error: `No ${budget} budget places found in ${city}`,
      });
    }

    res.json({
      city,
      budget,
      count: places.length,
      places,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cities with their place counts
exports.getAllCities = async (req, res) => {
  try {
    const cities = await Place.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          categories: { $addToSet: "$category" },
          avgRating: { $avg: "$rating" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      totalCities: cities.length,
      cities: cities.map((c) => ({
        name: c._id,
        placeCount: c.count,
        categories: c.categories,
        avgRating: Math.round(c.avgRating * 10) / 10,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get categories for a city
exports.getCategoriesByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const categories = await Place.aggregate([
      { $match: { city } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    if (categories.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json({
      city,
      categories: categories.map((c) => ({
        name: c._id,
        count: c.count,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Advanced search with multiple filters
exports.advancedSearch = async (req, res) => {
  try {
    const { city, category, tags, budget, minRating, maxPrice } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    // Build filter object
    const filter = { city };

    if (category) filter.category = category;
    if (budget) filter.budgetRange = budget;
    if (tags) {
      const tagArray = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagArray };
    }
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    if (maxPrice) {
      filter.avgCost = { $lte: parseInt(maxPrice) };
    }

    const places = await Place.find(filter).sort({ rating: -1 }).limit(50);

    if (places.length === 0) {
      return res.status(404).json({ error: "No places match your criteria" });
    }

    res.json({
      appliedFilters: filter,
      count: places.length,
      places,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get popular places in a city
exports.getPopularPlaces = async (req, res) => {
  try {
    const { city } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const places = await Place.find({ city })
      .sort({ popularityScore: -1, rating: -1 })
      .limit(limit);

    if (places.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json({
      city,
      limit,
      count: places.length,
      places,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get places by crowd level
exports.getPlacesByCrowdLevel = async (req, res) => {
  try {
    const { city, level } = req.params;
    const { timeSlot } = req.query;

    if (!["low", "medium", "high"].includes(level.toLowerCase())) {
      return res
        .status(400)
        .json({ error: "Invalid level. Use: low, medium, or high" });
    }

    if (
      !timeSlot ||
      !["morning", "afternoon", "evening"].includes(timeSlot.toLowerCase())
    ) {
      return res
        .status(400)
        .json({
          error:
            "timeSlot parameter required. Use: morning, afternoon, or evening",
        });
    }

    const places = await Place.find({ city });

    // Filter by crowd level
    const filteredPlaces = places.filter((place) => {
      if (!place.crowdPattern) return true;

      const weekdayLevel = place.crowdPattern.weekday?.[timeSlot.toLowerCase()];
      const weekendLevel = place.crowdPattern.weekend?.[timeSlot.toLowerCase()];

      let crowdScore = (weekdayLevel + weekendLevel) / 2;

      if (level.toLowerCase() === "low") return crowdScore < 40;
      if (level.toLowerCase() === "medium")
        return crowdScore >= 40 && crowdScore < 70;
      if (level.toLowerCase() === "high") return crowdScore >= 70;
    });

    res.json({
      city,
      crowdLevel: level,
      timeSlot,
      count: filteredPlaces.length,
      places: filteredPlaces.sort((a, b) => b.rating - a.rating),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single place details
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(place);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search places by name/keyword
exports.searchPlaces = async (req, res) => {
  try {
    const { keyword, city } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Search keyword is required" });
    }

    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $in: [new RegExp(keyword, "i")] } },
      ],
    };

    if (city) query.city = city;

    const places = await Place.find(query).sort({ rating: -1 }).limit(20);

    res.json({
      keyword,
      city: city || "All",
      count: places.length,
      places,
    });
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
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
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
      return res.status(404).json({ error: "Place not found" });
    }

    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
